import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetCategories } from '../../services/Venue'
import Client from '../../services/api'
import { GetVendorVenueDetails } from '../../services/Venue'
import '../../App.css'


const EditVenuesForm = ({ user }) => {
  let navigate = useNavigate()
  const { venue_id } = useParams()
  const [categories, setCategories] = useState([])
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image: '',
    package: [],
    price: 0,
    categories: ''
  })

  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
    console.log('form', editFormValues)
  }

  const handlePackageChange = (index, e) => {
    const newPackages = [...editFormValues.package]
    newPackages[index][e.target.name] = e.target.value
    setEditFormValues({ ...editFormValues, package: newPackages })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const response = await Client.put(
      `/categories/venues/${venue_id}`,
      editFormValues
    )
    navigate(`/venues/${venue_id}`)
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
  // added venue details
  useEffect(() => {
    const fetchVendorVenueDetails = async () => {
      const response = await GetVendorVenueDetails(venue_id)
      setEditFormValues(response.venue)
      console.log(response.venue)
    }
    fetchVendorVenueDetails()
  }, [venue_id])

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
              <label className="label-package" htmlFor="editpackages">
                Packages:
              </label>
              {editFormValues.package.map((pkg, index) => (
                <div key={index}>
                  <input
                    onChange={(e) => handlePackageChange(index, e)}
                    name="name"
                    type="text"
                    value={pkg.name}
                    placeholder={`Package ${index + 1} Name`}
                    required
                  />
                  <input
                    onChange={(e) => handlePackageChange(index, e)}
                    name="price"
                    type="number"
                    value={pkg.price}
                    placeholder={`Package ${index + 1} Price`}
                    required
                  />
                </div>
              ))}
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
