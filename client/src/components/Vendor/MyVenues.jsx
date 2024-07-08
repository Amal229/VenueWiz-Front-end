import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetAllVenue } from '../../services/Venue'

const MyVenue = ({ user }) => {
  const [venues, setVenues] = useState([])

  useEffect(() => {
    console.log(user)
    if (!user) return
    const getVendorVenues = async () => {
      const data = await GetAllVenue(user.id)
      console.log(data)
      setVenues(data)
    }
    getVendorVenues()
  }, [user])

  return (
    <div className="Venues">
      <h1>My Venues</h1>
      <div className="venue-container">
        {venues.map((venue) => (
          <Link
            to={`/categories/${category_id}/venues/${venue._id}`}
            key={venue._id}
            className="venue-card"
          >
            <div className="venue-info-wrapper">
              <h2>{venue.name}</h2>
            </div>
            <div className="venue-img-wrapper">
              <img src={venue.image} alt={venue.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyVenue
