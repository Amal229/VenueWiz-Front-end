import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'
import '../../App.css'

const EditVenuesForm = ({ user }) => {
  const [submittedVenue, setSubmittedVenue] = useState(null) //delete
  const [categories, setCategories] = useState([])
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    packages: [],
    price: 0,
    categories: ''
  })
  const { venue_id } = useParams()

  // const fetchVenues = async () => {
  //   const response = await Client.get('/venues')
  //   setVenues(response.data)
  // }

  useEffect(() => {
    // fetchVenues()
  }, [])

  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  }
  // const newVenue = response.data
  // setVenues([...venues, newVenue])

  // setSubmittedVenue({
  //   name: formValues.name,
  //   location: formValues.location
  // })
  const handleUpdate = async (e) => {
    e.preventDefault()
    const response = await Client.put(
      `/categories/venues/${venue_id}`,
      editFormValues
    )
    const updatedVenue = response.data
    // setVenues((lastVenue) =>
    //   lastVenue.map((venue) => {
    //     if (venue._id === updatedVenue._id) {
    //       return updatedVenue
    //     } else {
    //       return venue
    //     }
    //   })
    // )
    setEditFormValues({
      name: '',
      location: '',
      description: '',
      website: '',
      image: '',
      packages: [],
      price: 0,
      categories: []
    })
  }

  // const handleEdit = (venue) => {
  //   setEditFormValues({ ...venue })
  // }

  // const handleDelete = async (venueId) => {
  //   await axios.delete(`http://localhost:3001/venues/${venue_id}`)
  //   setVenues(venues.filter((venue) => venue._id !== venueId))
  // }
  //for categories selection
  useEffect(() => {
    console.log(user)
    const fetchCategories = async () => {
      try {
        const response = await GetCategories()
        setCategories(response)
        console.log('categories', response)
      } catch (error) {
        console.log('Error Connecting', error)
      }
    }

    fetchCategories()
  }, [])
  return (
    <div className="Forms">
      <h2>Edit your Venue:</h2>
      {editFormValues && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="editName">Name:</label>
            <input
              onChange={handleEditChange}
              name="name"
              type="text"
              value={editFormValues.name}
              placeholder="Edit venue name"
              required
            />
          </div>
          <div>
            <label htmlFor="editLocation">Location URL:</label>
            <input
              onChange={handleEditChange}
              name="location"
              type="text"
              value={editFormValues.location}
              placeholder="Edit venue location URL"
              required
            />
          </div>
          <div>
            <label htmlFor="editdescription">Description:</label>
            <input
              onChange={handleEditChange}
              name="description"
              type="text"
              value={editFormValues.description}
              placeholder="Edit venue description"
              required
            />
          </div>
          <div>
            <label htmlFor="editwebsite">Website URL:</label>
            <input
              onChange={handleEditChange}
              name="website"
              type="text"
              value={editFormValues.website}
              placeholder="Edit venue website URL"
              required
            />
          </div>
          <div>
            <label htmlFor="editimage">Image URL:</label>
            <input
              onChange={handleEditChange}
              name="image"
              type="text"
              value={editFormValues.image}
              placeholder="Edit venue image URL"
              required
            />
          </div>
          <div>
            <label htmlFor="editprice">Price:</label>
            <input
              onChange={handleEditChange}
              name="price"
              type="number"
              value={editFormValues.price}
              placeholder="Edit venue price"
              required
            />
          </div>
          <div>
            <label htmlFor="editpackages">Packages:</label>
            <input
              onChange={handleEditChange}
              name="packages"
              type="text"
              value={editFormValues.packages}
              placeholder="Edit package1,package2..... "
              required
            />
          </div>
          <div>
            <label htmlFor="editcategory">Category</label>
            <select
              onChange={handleEditChange}
              name="categories"
              value={editFormValues.categories}
            >
              {categories?.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>

          <button>Update Venue</button>
        </form>
      )}
      {/* <button onClick={() => handleDelete(venues._id)}>Delete</button>
      <button onClick={() => handleEdit(venues)}>Edit</button> */}
    </div>
  )
}

export default EditVenuesForm
