import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'
import '../../App.css'

const AddingVenuesForm = ({ user }) => {

  const [categories, setCategories] = useState([])

  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    packages: [],
    price: '',
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
      <div className="Forms-container">
        <h1>Add New Venue</h1>
        <form className="Forms-add" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name"></label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name}
              placeholder="Venue Name"
              required
            />
          </div>
          <div>
            <label htmlFor="location"></label>
            <input
              onChange={handleChange}
              name="location"
              type="text"
              value={formValues.location}
              placeholder="Location URL"
              required
            />
          </div>
          <div>
            <label htmlFor="description"></label>
            <input
              onChange={handleChange}
              name="description"
              type="text"
              value={formValues.description}
              placeholder="Venue Description"
              required
            />
          </div>
          <div>
            <label htmlFor="website"></label>
            <input
              onChange={handleChange}
              name="website"
              type="text"
              value={formValues.website}
              placeholder="Website URL"
              required
            />
          </div>
          <div>
            <label htmlFor="image"></label>
            <input
              onChange={handleChange}
              name="image"
              type="text"
              value={formValues.image}
              placeholder="Venue Image URL"
              required
            />
          </div>
          <div>
            <label htmlFor="price"></label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              value={formValues.price}
              placeholder="Venue Price"
              required
            />
          </div>
          <div>
            <label htmlFor="packages"></label>
            <input
              onChange={handleChange}
              name="packages"
              value={formValues.packages}
              placeholder="Package1,Package2..... "
              required
            />
          </div>
          <div>
            <label htmlFor="categories"> </label>
            <select
              onChange={handleChange}
              name="categories"
              placeholder="Choose Category"
              required
            >
              <option value="">Select Category </option>
              {categories?.map((cate) => (
                <option key={cate.id} value={cate.id}>
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
              !formValues.packages ||
              !formValues.website
            }
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddingVenuesForm
