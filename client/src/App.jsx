import './App.css'
import Venue from './components/Vendor/AddingVenuesForm'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await api.get('/auth/check-session')
          setUser(response.data.user)
        } catch (error) {
          console.error('Error checking session:', error)
          localStorage.removeItem('token') // Remove invalid token
          setUser(null)
        }
      }
    }
    checkToken()
  }, [])

  const handleLogin = (user, token) => {
    localStorage.setItem('token', token)
    setUser(user)
  }

  return (
    <div>
      <Nav user={user} />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          {/* should accept user */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="Venue" element={<Venue />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
