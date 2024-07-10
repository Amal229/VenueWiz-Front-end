import { useState } from "react"
import { Link } from "react-router-dom"
import { DeleteVenue } from "../../services/Venue"

const VenueCard = ({ path, venue, onDelete }) => {
  const [venueToDelete, setVenueToDelete] = useState(null)

  const handleDeleteVenue = (venueId) => {
    setVenueToDelete(venueId)
  }

  const handleConfirmDeleteVenue = async () => {
    if (venueToDelete) {
      try {
        await DeleteVenue(venueToDelete)
        onDelete(venueToDelete)
      } catch (error) {
        console.error(`Error deleting venue: ${error.message}`)
      }
      setVenueToDelete(null)
    }
  }

  const handleCancelDeleteVenue = () => {
    setVenueToDelete(null)
  }

  return (
    <>
      <Link to={path} key={venue._id} className="venue-card">
        <div className="venue-info-wrapper">
          <h2>{venue.name}</h2>
        </div>
        <div className="venue-img-wrapper">
          <img src={venue.image} alt={venue.name} />
        </div>
        <button
          className="delete-button"
          onClick={() => handleDeleteVenue(venue._id)}
        >
          x
        </button>
      </Link>

      {venueToDelete && (
        <div className="delete-confirmation">
          <p>Delete Venue?</p>
          <div className="deleteCconfirmation-buttons">
            <button
              className="confirm-button"
              onClick={handleConfirmDeleteVenue}
            >
              Delete
            </button>
            <button className="cancel-button" onClick={handleCancelDeleteVenue}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default VenueCard
