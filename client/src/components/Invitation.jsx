import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { GetEventDetails } from "../services/Event"
import { useRive } from 'rive-react'

import RiveComponent from '@rive-app/react-canvas'

const Invitation = ({ invitationLink, user }) => {
  const { event_id } = useParams()
  const [event, setEvent] = useState(null)
  const [paused, setPaused] = useState(true)
  const [voices, setVoices] = useState([])
  const { Rive, stateMachine } = useRive({
    resourceName: 'login_screen_character'
  })

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Invitation",
          text: "You are invited to my event",
          url: invitationLink,
        })
      } else {
        const shareURL = `You are invited to my event: ${invitationLink}`
        console.log("Share URL:", shareURL)
      }
    } catch (error) {
      console.error("Error sharing:", error.message)
    }
  }

  const handleSpeech = (text) => {
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.voice =
      voices.find((voice) => voice.lang === "en-US") || voices[0]
    utterance.lang = "en-US"

    if (paused) {
      console.log("Playing")
      speechSynthesis.speak(utterance)
    } else {
      console.log("Pausing")
      speechSynthesis.pause()
    }
    setPaused(!paused)
  }

  useEffect(() => {
    const fetchEventDetails = async () => {
      const data = await GetEventDetails(event_id)
      const dateObject = moment(data.bookingDate)
      const formattedBookingDate = dateObject.format("MMMM Do, YYYY")
      const day = dateObject.format("dddd")

      setEvent({ ...data, date: formattedBookingDate, day: day })
      console.log("Event details:", data)
    }
    fetchEventDetails()

    const getVoices = () => {
      const voices = speechSynthesis.getVoices()
      setVoices(voices)
    }

    getVoices()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = getVoices
    }
  }, [event_id])

  return (
    <div className="invitation-container">
      <img
        src="path-to-your-character-image.png"
        alt="Friendly bear"
        className={`character ${paused ? "" : "speaking"}`}
      />
      <RiveComponent
        src="/images/speaking_bear.riv"
        className="base-canvas-size"
      />
      <h2>You're Invited to {user?.name}'s Event!</h2>
      {event ? (
        <>
          <p>
            We're thrilled to invite you to this event on {event.day},{" "}
            {event.date}. The event will be held at {event.venueId.name}{" "}
            <a href={event.venueId.location}>Location</a>.
          </p>
          <button
            onClick={() =>
              handleSpeech(
                `We're thrilled to invite you to this event on ${event.day}, ${event.date}. The event will be held at ${event.venueId.name}`
              )
            }
          >
            {paused ? "Speak" : "Pause"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleShare}>Share Invitation</button>
    </div>
  )
}

export default Invitation
