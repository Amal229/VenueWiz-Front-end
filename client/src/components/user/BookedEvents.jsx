import { useState, useEffect } from 'react'
import moment from 'moment'
import { GetUserEvents } from '../../services/Event'

const BookedEvents = ({ user }) => {
  const [events, setEvents] = useState([])

  const formattedDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  useEffect(() => {
    const getuserevents = async () => {
      const data = await GetUserEvents(user.id)
      setEvents(data)
    }
    getuserevents()
  }, [])

  return (
    <div>
      <h1>My Events</h1>
      {events.length !== 0 ? (
        events.map((event) => (
          <div key={event._id}>
            <h3>{event.venueId.name}</h3>
            <p>{formattedDate(event.bookingDate)}</p>
            <p>{event.guestNumbers} people</p>
            <p>{event.package}</p>
            <p>{event.userId.phoneNumber}</p>
            <p>{event.notes !== '' ? event.notes : '-'}</p>
            <Link to={`/eventdetails/${event._id}`}>view Details</Link>
          </div>
        ))
      ) : (
        <div>Start Booking for your events</div>
      )}
    </div>
  )
}

export default BookedEvents
