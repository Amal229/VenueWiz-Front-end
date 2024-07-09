import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/api'
const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`)
        setCategories(response.data)
      } catch (error) {
        console.log('Error Connecting', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="Categories">
      <h1>Categories</h1>
      <div className="category-container">
        {categories.map((category) => (
          <Link
            to={`/categories/${category._id}`}
            key={category._id}
            className="category-card"
          >
            <div className="-info-wrapper">
              <h2>{category.name}</h2>
            </div>
            <div className="img-wrapper">
              <img src={`/images/${category.img}`} alt={category.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
