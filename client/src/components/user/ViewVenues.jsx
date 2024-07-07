import '../../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../../services/api'

const ViewVenues = () => {
  const [venues, setVenues] = useState([])

  const { category_id } = useParams()

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/categories/${category_id}`
        )
        setVenues(response.data)
        console.log(response.data)
      } catch (error) {
        console.log('Error Connecting', error)
      }
    }

    fetchVenues()
  }, [category_id])

  return (
    <div className="Venues">
      <h1>Venues</h1>
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

export default ViewVenues
