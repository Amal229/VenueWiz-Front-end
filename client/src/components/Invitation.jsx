import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRive } from 'rive-react'
import RiveComponent from '@rive-app/react-canvas'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { GetEventDetails } from '../services/Event'

const Invitation = ({ invitationLink, user }) => {
  const { event_id } = useParams()
  const [event, setEvent] = useState(null)
  const [paused, setPaused] = useState(true)

  const { Rive, stateMachine } = useRive({
    resourceName: 'login_screen_character'
  })

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Invitation',
          text: 'You are invited to my event',
          url: invitationLink
        })
      } else {
        const shareURL = `You are invited to my event: ${invitationLink}`
        console.log('Share URL:', shareURL)
      }
    } catch (error) {
      console.error('Error sharing:', error.message)
    }
  }

  const handleSpeech = (text) => {
    let utterance = new SpeechSynthesisUtterance(text)

    // utterance.lang = 'en-US'

    setPaused(!paused)
    if (paused) {
      console.log('plays')
      speechSynthesis.speak(utterance)
      speechSynthesis.resume()
    } else {
      console.log('paused')
      speechSynthesis.pause()
    }
  }

  useEffect(() => {
    const fetchEventDetails = async () => {
      const data = await GetEventDetails(event_id)
      const dateObject = moment(data.bookingDate)
      const formattedBookingDate = dateObject.format('MMMM Do, YYYY')
      const day = dateObject.format('dddd')

      setEvent({ ...data, date: formattedBookingDate, day: day })
    }
    fetchEventDetails()
  }, [event_id])

  return (
    <div className="invitation-container">
      <RiveComponent src="/images/speaking_bear.riv" className="bear" />
      <button
        className='voice-btn'
        onClick={() =>
          handleSpeech(
            `We're thrilled to invite you to ${event.name} on ${event.day}, ${event.date}. The event will be held at ${event.venueId.name}`
          )
        }
      >
        {paused ? <FontAwesomeIcon icon={faVolumeUp} /> : <FontAwesomeIcon icon={faVolumeOff} /> }
      </button>
      
      {event ? (
        <>
          <h2>You're Invited to {event.name} Event!</h2>
          <p className='invitation-msg'>
            <br></br>
            Date: {event.day}, {event.date} <br></br>
            Venue: {event.venueId.name}{' '}<br></br>
            Location: <a href={event.venueId.location}>Location</a>.
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button className='share-btn' onClick={handleShare}>Share Invitation</button>
    </div>
  )
}

export default Invitation
