import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetAllVenue } from '../../services/Venue'

const MyVenue = ({ user }) => {
  const [venues, setVenues] = useState([])

  useEffect(() => {
    if (user) {
      
      const getVendorVenues = async () => {
        const data = await GetAllVenue(user.id)
        console.log(data)
        setVenues(data)
      }
      getVendorVenues()
    }
  }, [user])

  return (
    <div className="Venues">
      <h1>My Venues</h1>
      <Link to={`/venues/newvenue`}>Add venue</Link>
      <div className="venue-container">
        {venues.length !== 0 ? venues.map((venue) => (
          <Link
            to={`/categories/${venue.categories[0]}/venues/${venue._id}`}
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
        )) :
          <h3>No Venues Yet</h3>
        }
      </div>
    </div>
  )
}

export default MyVenue
