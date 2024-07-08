import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditVenuesForm = ({ user }) => {
  const [submittedVenue, setSubmittedVenue] = useState(null)
  const [venues, setVenues] = useState([])
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    price: '',
    categories: ''
  })

  useEffect(() => {
    const fetchVenues = async () => {
      const response = await axios.get(
        `http://localhost:3001/venue/vendor/${vendor_id}`
      )
      setVenues(response.data)
    }
    fetchVenues()
  }, [user.id])
  // const handleEditChange = (e) => {
  //   setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  // }
  // const handleUpdate = async (e) => {
  //   e.preventDefault()
  //   const response = await axios.put('http://localhost:3001/venues/:venue_id')
  // const updatedVenue = response.data
  // setVenues((lastVenues) =>
  //   lastVenues.map((venue) => {
  //     if (venue._id === updatedVenue._id) {
  //       return updatedVenue
  //     } else {
  //       return venue
  //     }
  //   })
  // )
  // setEditFormValues({
  //   name: '',
  //   location: '',
  //   description: '',
  //   website: '',
  //   image: '',
  //   price: '',
  //   categories: ''
  // })
  // }
  // const handleEdit = (venue) => {
  //   setEditFormValues(venue)
  // }

  {
    /* {editFormValues._id && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="editName">Name</label>
            <input
              onChange={handleEditChange}
              name="name"
              type="text"
              value={editFormValues.name}
              required
            />
          </div>
          <div>
            <label htmlFor="editLocation">Location</label>
            <input
              onChange={handleEditChange}
              name="location"
              type="text"
              value={editFormValues.location}
              required
            />
          </div>
          <button>Update Venue</button>
        </form>
      )} */
    {
      /* <button onClick={() => handleEdit(venue)}>Edit</button> */
    }
  }
}

export default EditVenuesForm
