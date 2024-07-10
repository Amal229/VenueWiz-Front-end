import { useState, useEffect } from 'react'
import moment from 'moment'
import { GetVendorEvents } from '../../services/Event'

const BookedVenues = ({ user }) => {
  const [events, setEvents] = useState([])

  const formattedDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  useEffect(() => {
    const getvendorevents = async () => {
      const data = await GetVendorEvents(user.id)
      setEvents(data)
      console.log('event with formatted date?', events)
    }
    getvendorevents()
  }, [])

  return (
    <div>
      <h1 className="events-h1">My Events</h1>
      <div className="event-container">
        {events.length !== 0 ? (
          events.map((event) => (
            <div key={event._id} className="info-wrapper">
              <h3 className="event-h3">{event.venueId.name}</h3>
              <p>{formattedDate(event.bookingDate)}</p>
              <p>{event.guestNumbers} people</p>
              <p>{event.package}</p>
              <p>{event.userId.phoneNumber}</p>
              <p>{event.notes !== '' ? event.notes : '-'}</p>
            </div>
          ))
        ) : (
          <div>No Booked Venues</div>
        )}
      </div>
    </div>
  )
}

export default BookedVenues
