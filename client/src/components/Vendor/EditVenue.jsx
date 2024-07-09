import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'
import '../../App.css'

const EditVenuesForm = ({ user }) => {
  const { venue_id } = useParams()
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

  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const response = await Client.put(
      `/categories/venues/${venue_id}`,
      editFormValues
    )
  }

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
        <h1>Edit your Venue</h1>
        {editFormValues && (
          <form className="Forms-add" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="editName"></label>
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
              <label htmlFor="editLocation"></label>
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
              <label htmlFor="editdescription"></label>
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
              <label htmlFor="editwebsite"> </label>
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
              <label htmlFor="editimage"></label>
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
              <label htmlFor="editprice"></label>
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
              <label htmlFor="editpackages"></label>
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
              <label htmlFor="editcategory"></label>
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
      </div>
    </div>
  )
}

export default EditVenuesForm
