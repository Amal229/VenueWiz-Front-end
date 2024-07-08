import React from "react"
import { Routes, Route } from "react-router-dom"
import Invitation from "./components/Invitation"
import "./App.css"
import { useState, useEffect } from "react"
import Venue from "./components/Vendor/AddingVenuesForm"
import { Routes, Route } from "react-router-dom"
import Categories from "./components/Categories"
import ViewVenues from "./components/user/ViewVenues"
import Dashboard from "./components/DashBoard"
import Nav from "./components/Nav"
import VenueBookingForm from "./components/user/VenueBookingForm"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import { CheckSession } from "./services/Auth"
import EventDetials from "./components/Vendor/EventDetails"
import BookedEvents from "./components/user/BookedEvents"
import VenueDetails from "./components/user/VenueDetails"
import About from "./components/About"
import Home from "./components/Home"

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
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          {" "}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category_id" element={<ViewVenues />} />
          {/* should accept user */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route
            path="/categories/:category_id/venues/:venue_id"
            element={<VenueDetails />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/categories/:category_id/venues/:venue_id/newEvent"
            element={<VenueBookingForm user={user} />}
          />
          <Route
            path="/invitation"
            element={
              <Invitation
                invitationMessage="You are invited!"
                invitationLink={window.location.href}
              />
            }
          />
          <Route path="Venue" element={<Venue />} />
          <Route path="/bookedevents" element={<BookedEvents />} />
          <Route path="/eventdetails/:eventId" element={<EventDetials />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
