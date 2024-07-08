import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { GetEventDetails } from '../services/Event'

const Invitation = ({ invitationLink, user }) => {
  const { event_id } = useParams()
  const [event, setEvent] = useState(null)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Invitation',
          text: 'you are invited to my event',
          url: invitationLink
        })
      } else {
        const shareURL = `${invitationMessage} ${invitationLink}`
        console.log('Share URL:', shareURL)
      }
    } catch (error) {
      console.error('Error sharing:', error.message)
    }
  }

  useEffect(() => {
    const fetchEventDetails = async () => {
      const data = await GetEventDetails(event_id)
      const dateObject = moment(data.bookingDate)
      const formattedBookingDate = dateObject.format('MMMM Do, YYYY')
      const day = dateObject.format('dddd')

      setEvent({ ...data, date: formattedBookingDate, day: day })
      console.log('event details', data)
    }
    fetchEventDetails()
  }, [event_id])

  return (
    <div className="invitation-container">
      <h2>You're Invited to {user?.name}'s Event!</h2>
      {event ? (
        <>
          <p>
            We're thrilled to invite you to this event on {event.day},{' '}
            {event.date}. The event will be held at {event.venueId.name}{' '}
            <a href={event.venueId.location}>Location</a>.
          </p>
        </>
      ) : (
        <p>Loading</p>
      )}

      <button onClick={handleShare}>Share Invitation</button>
    </div>
  )
}

export default Invitation
