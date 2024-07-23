import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Invitation from './components/Invitation'
import './App.css'
import { useState, useEffect } from 'react'
import AddingVenuesForm from './components/Vendor/AddingVenuesForm'
import Categories from './components/Categories'
import ViewVenues from './components/user/ViewVenues'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'
import VenueBookingForm from './components/user/VenueBookingForm'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import EventDetials from './components/Vendor/EventDetails'
import { CheckSession } from './services/Auth'
import VenueDetails from './components/user/VenueDetails'
import About from './components/About'
import Home from './components/Home'
import MyVenue from './components/Vendor/MyVenues'
import VendorVenueDetails from './components/Vendor/VenueDetails'
import EditVenuesForm from './components/Vendor/EditVenue'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />

          {/* vendor routes */}
          <Route path="/venues" element={<MyVenue user={user} />} />
          <Route path="/venues" element={<MyVenue />} />
          <Route path="/categories/:category_id" element={<ViewVenues />} />
          <Route
            path="/venues/newvenue"
            element={<AddingVenuesForm user={user} />}
          />
          <Route path="/venues/:venue_id" element={<VendorVenueDetails />} />
          <Route
            path="/venues/:venue_id/editvenue"
            element={<EditVenuesForm user={user} />}
          />

          {/* user routes */}
          <Route path="/categories/:category_id" element={<ViewVenues />} />
          <Route
            path="/categories/:category_id/venues/:venue_id"
            element={<VenueDetails user={user} />}
          />
          <Route
            path="/categories/:category_id/venues/:venue_id/newEvent"
            element={<VenueBookingForm user={user} />}
          />
          <Route path="/eventdetails/:eventId" element={<EventDetials />} />
          <Route
            path="/invitation/:event_id"
            element={
              <Invitation user={user} invitationLink={window.location.href} />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
