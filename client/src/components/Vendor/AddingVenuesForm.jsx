import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'

const AddingVenuesForm = ({ user }) => {
  // const { vendor_id } = useParams()

  const [categories, setCategories] = useState([])

  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    packages: [],
    price: 0,
    categories: []
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      ...formValues,
      vendor_ref: user.id
    }

    const response = await Client.post('/categories/venues', data)
    console.log(data)

    // const newVenue = response.data
    // setVenues([...venues, newVenue])

    // setFormValues({
    //   name: '',
    //   location: '',
    //   description: '',
    //   website: '',
    //   image: '',
    //   packages: [],
    //   price: 0,
    //   categories: ''
    // })
    // setSubmittedVenue(newVenue)
  }

  // const handleDelete = async (venueId) => {
  //   await axios.delete('http://localhost:3001/venues/:venue_id')
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
              name="location"
              type="text"
              value={formValues.location}
              required
            />
          </div>
          <div>
            <label htmlFor="description">description</label>
            <input
              onChange={handleChange}
              name="description"
              type="text"
              value={formValues.description}
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
            <label htmlFor="packages">packages</label>
            <input
              onChange={handleChange}
              name="packages"
              type="text"
              value={formValues.packages}
              required
            />
          </div>
          <div>
            <label htmlFor="categories">categories</label>
            <select onChange={handleChange} name="categories">
              {categories?.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={
              !formValues.name ||
              !formValues.location ||
              !formValues.categories ||
              !formValues.description ||
              !formValues.image ||
              !formValues.price ||
              !formValues.website
            }
          >
            Add your venue
          </button>
        </form>
      </div>

      {/* <h3>Venue List</h3>
      {venues.map((venue) => (
        <div key={venue._id}>
          <h4>name:{venue.name}</h4>
          <h4>location:{venue.location}</h4>
          <button onClick={() => handleDelete(venue._id)}>Delete</button>
        </div>
      ))} */}
    </div>
  )
}
export default AddingVenuesForm
