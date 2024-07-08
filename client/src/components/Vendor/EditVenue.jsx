import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'

const EditVenuesForm = ({ user }) => {
  const [submittedVenue, setSubmittedVenue] = useState(null) //delete
  const [venues, setVenues] = useState([]) //for update
  const [categories, setCategories] = useState([])
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    packages: [],
    price: 0,
    categories: []
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
    <div>
      {editFormValues && (
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
          <div>
            <label htmlFor="editdescription">description</label>
            <input
              onChange={handleEditChange}
              name="description"
              type="text"
              value={editFormValues.description}
              required
            />
          </div>
          <div>
            <label htmlFor="editwebsite">website</label>
            <input
              onChange={handleEditChange}
              name="website"
              type="text"
              value={editFormValues.website}
              required
            />
          </div>
          <div>
            <label htmlFor="editimage">image</label>
            <input
              onChange={handleEditChange}
              name="image"
              type="text"
              value={editFormValues.image}
              required
            />
          </div>
          <div>
            <label htmlFor="editprice">price</label>
            <input
              onChange={handleEditChange}
              name="price"
              type="number"
              value={editFormValues.price}
              required
            />
          </div>
          <div>
            <label htmlFor="editpackages">packages</label>
            <input
              onChange={handleEditChange}
              name="packages"
              type="text"
              value={editFormValues.packages}
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
