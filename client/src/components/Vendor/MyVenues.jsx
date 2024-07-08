import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/api'
const MyVenue = ({ user }) => {
  const [MyVenue, setVenues] = useState([])

  useEffect(() => {
    const fetchMyVenue = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/venues/${user._id}`)
        setVenues(response.data)
      } catch (error) {
        console.log('Error Connecting', error)
      }
    }

    fetchMyVenue()
  }, [])

  return (
    <div className="MyVenue">
      <h1>MyVenue</h1>
      <div className="MyVenue-container">
        {MyVenue.map((venue) => (
          <Link
            to={`/venues/${venue._id}`}
            key={venue._id}
            className="user-card"
          >
            <div className="info-wrapper">
              <h2>{venue.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyVenue
