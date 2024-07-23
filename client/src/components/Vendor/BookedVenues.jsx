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
    }
    getvendorevents()
  }, [])

  return (
    <div>
      <h1 className="events-h1">My Events</h1>
      <div className="event-cards-container">
        {events.length !== 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card-divs">
              <h3 className="event-title">{event.venueId.name}</h3>
              <p className="event-date">{formattedDate(event.bookingDate)}</p>
              <p className="event-guests">{event.guestNumbers} people</p>
              <p className="event-package">{event.package}</p>
              <p className="event-contact">{event.userId.phoneNumber}</p>
              <p className="event-notes">
                {event.notes !== '' ? event.notes : '-'}
              </p>
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
