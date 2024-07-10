import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GetEventDetails } from '../../services/Event'
import { useParams } from 'react-router-dom'
import '../../App.css'

const EventDetials = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const fetchEventDetails = async () => {
      const data = await GetEventDetails(eventId)
      setEvent(data)
    }
    fetchEventDetails()
  }, [eventId])

  const formattedDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
  }
  if (!event) return <div>no event found!</div>

  return (
    <div className="container-center-event">
      <h1 className="events-h1">Event Details</h1>
      <div className="event-container-detail">
        <div className="event-img-wrapper-detail">
          <img src="../../images/ celebrating (1).png" alt={event.name} />
        </div>
        <div className="event-card-detail">
          <div className="info-wrapper-event">
            <h2 className="event=h3">{event.name}</h2>
            <h3>Date: {formattedDate(event.bookingDate)}</h3>
            <h3>Guests: {event.guestNumbers}</h3>
            <h3>Package: {event.package}</h3>
            <h3>Notes: {event.notes}</h3>
            <Link to={`/invitation/${event._id}`}>
              <button>Invite</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetials
