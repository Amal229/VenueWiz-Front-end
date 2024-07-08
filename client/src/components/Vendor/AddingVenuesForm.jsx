import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'
import '../../App.css'

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
  }
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
      <h2>Add your Venue:</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name}
              placeholder="Enter venue name"
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location URL:</label>
            <input
              onChange={handleChange}
              name="location"
              type="text"
              value={formValues.location}
              placeholder="Enter location URL"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              onChange={handleChange}
              name="description"
              type="text"
              value={formValues.description}
              placeholder="Enter venue description"
              required
            />
          </div>
          <div>
            <label htmlFor="website">Website URL:</label>
            <input
              onChange={handleChange}
              name="website"
              type="text"
              value={formValues.website}
              placeholder="Enter Website URL"
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              onChange={handleChange}
              name="image"
              type="text"
              value={formValues.image}
              placeholder="Enter venue image URL"
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              value={formValues.price}
              placeholder="Enter venue price"
              required
            />
          </div>
          <div>
            <label htmlFor="packages">Packages:</label>
            <input
              onChange={handleChange}
              name="packages"
              type="text"
              value={formValues.packages}
              placeholder="Enter package1,package2..... "
              required
            />
          </div>
          <div>
            <label htmlFor="categories">Categories:</label>
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
            Add
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
