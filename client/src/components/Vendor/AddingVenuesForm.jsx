import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const AddingVenuesForm = ({ user }) => {
  // const { vendor_id } = useParams()

  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    price: 0,
    categories: ''
  })
  const [submittedVenue, setSubmittedVenue] = useState(null)

  const [venues, setVenues] = useState([])

  // const [editFormValues, setEditFormValues] = useState({
  //   name: '',
  //   location: '',
  //   description: '',
  //   website: '',
  //   image: '',
  //   price: '',
  //   categories: ''
  // })

  // useEffect(() => {
  //   const fetchVenues = async () => {
  //     const response = await axios.get(
  //       `http://localhost:3001/venue/vendor/${vendor_id}`
  //     )
  //     setVenues(response.data)
  //   }
  //   fetchVenues()
  // }, [user.id])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  // const handleEditChange = (e) => {
  //   setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      ...formValues,
      vendor_ref: user.id
    }

    const response = await axios.post('http://localhost:3001/venues', data)
    console.log(data)

    const newVenue = response.data
    setVenues([...venues, newVenue])

    setFormValues({
      name: '',
      location: '',
      description: '',
      website: '',
      image: '',
      price: '',
      categories: ''
    })
    setSubmittedVenue(newVenue)
  }
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
  const handleDelete = async (venueId) => {
    await axios.delete('http://localhost:3001/venues/:venue_id')
    setVenues(venues.filter((venue) => venue._id !== venueId))
  }
  // const handleEdit = (venue) => {
  //   setEditFormValues(venue)
  // }
  return (
    <div className="Forms">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              onChange={handleChange}
              name="locaiton"
              type="text"
              value={formValues.location}
              required
            />
          </div>
          <div>
            <label htmlFor="descritption">descritption</label>
            <input
              onChange={handleChange}
              name="descritption"
              type="text"
              value={formValues.descritption}
              required
            />
          </div>
          <div>
            <label htmlFor="website">website</label>
            <input
              onChange={handleChange}
              name="website"
              type="text"
              value={formValues.website}
              required
            />
          </div>
          <div>
            <label htmlFor="image">image</label>
            <input
              onChange={handleChange}
              name="image"
              type="text"
              value={formValues.image}
              required
            />
          </div>
          <div>
            <label htmlFor="price">price</label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              value={formValues.price}
              required
            />
          </div>
          <div>
            <label htmlFor="package">package</label>
            <input
              onChange={handleChange}
              name="package"
              type=""
              value={formValues.package}
              required
            />
          </div>
          <div>
            <label htmlFor="categories">categories</label>
            <input
              onChange={handleChange}
              name="categories"
              type=""
              value={formValues.categories}
              required
            />
          </div>
          <button disabled={!formValues.name || !formValues.location}>
            Add your venue
          </button>
        </form>
      </div>
      {/* {editFormValues._id && (
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
      )} */}
      <h3>Venue List</h3>
      {venues.map((venue) => (
        <div key={venue._id}>
          <h4>name:{venue.name}</h4>
          <h4>location:{venue.location}</h4>
          <button onClick={() => handleDelete(venue._id)}>Delete</button>
          {/* <button onClick={() => handleEdit(venue)}>Edit</button> */}
        </div>
      ))}
    </div>
  )
}
export default AddingVenuesForm
