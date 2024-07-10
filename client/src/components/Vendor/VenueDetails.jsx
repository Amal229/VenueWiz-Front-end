import React, { useState, useEffect } from 'react'
import Client from '../../services/api'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/api'
import { Link } from 'react-router-dom'

const VenueDetails = () => {
  const [venue, setVenue] = useState(null)
  const { venue_id } = useParams()

  useEffect(() => {
    const getVenue = async () => {
      console.log('ueEffect')
      try {
        const response = await Client.get(`${BASE_URL}/venues/${venue_id}`)
        console.log('API Response:', response.data)
        setVenue(response.data.venue)
      } catch (error) {
        console.error('Error Connecting:', error)
      }
    }

    getVenue()
  }, [venue_id])

  console.log('before venue check')
  if (!venue) {
    return null
  }
  console.log('rendering')
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
            <h3> {venue.description}</h3>
            {venue.location && (
              <h3>
                location: <a href={venue.location}>{venue.location}</a>
              </h3>
            )}
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
                Website: <a href={venue.website}>{venue.website}</a>
              </h3>
            )}

            <Link to={`/venues/${venue_id}/editvenue`}>
              <button>Edit Venue</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueDetails
