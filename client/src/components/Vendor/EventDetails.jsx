import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { GetEventDetails } from '../../services/Event'
import { useParams } from 'react-router-dom'

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
  if (!event) return <div>no event found</div>

  return (
    <div>
      <h1>Event Details</h1>
      <h3>{event.venueId.name}</h3>
      <p>Date:{formattedDate(event.bookingDate)}</p>
      <p>Guests:{event.guestNumbers}</p>
      <p>package:{event.package}</p>
      <p>contact: {event.userId.phoneNumber}</p>
      <p>Notes:{event.notes}</p>
    </div>
  )
}

export default EventDetials
