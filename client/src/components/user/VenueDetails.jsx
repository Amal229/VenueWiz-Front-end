import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../../services/api'

const VenueDetails = ({ user }) => {
  const [venue, setVenue] = useState(null)
  const { category_id, venue_id } = useParams()

  useEffect(() => {
    const getVenue = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/categories/${category_id}/venues/${venue_id}`
        )
        setVenue(response.data.venue)
      } catch (error) {
        console.error('Error Connecting:', error)
      }
    }

    getVenue()
  }, [category_id, venue_id])

  if (!venue) {
    return null
  }

  return (
    <div className="venue">
      <h1>Venue Details</h1>
      <div className="">
        <div key={venue._id} className="venue-card-detail">
          <div className="venue-img-wrapper-detail">
            <img src={venue.image} alt={venue.name} />
          </div>
          <div className="venue-info-wrapper-detail">
            <h2>{venue.name}</h2>
            <h3>Description: {venue.description}</h3>
            <h3>Location: {venue.location}</h3>
            <h3>Price: ${venue.price}</h3>
            <h3>Packages:</h3>
            <ul>
              {venue.package.map((pkg) => (
                <li key={pkg._id}>
                  {pkg.name} - ${pkg.price}
                </li>
              ))}
            </ul>
            {venue.website && (
              <h3>
                Website: <a href={venue.website}>{venue.name}</a>
              </h3>
            )}
            {user ? (
              <Link
                to={`/categories/${category_id}/venues/${venue_id}/newEvent`}
              >
                {}
                <button>Book Venue</button>
              </Link>
            ) : (
              <Link to={`/login`}>
                {}
                <button>Book Venue</button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueDetails
