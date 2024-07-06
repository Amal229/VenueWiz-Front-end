import './App.css'
import Venue from './components/Vendor/AddingVenuesForm'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState({})

  const handleLogOut = () => {
    // Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      {/* nav */}
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="Venue" element={<Venue user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
