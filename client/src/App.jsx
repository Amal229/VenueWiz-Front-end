import './App.css'
import AddingVenuesForm from './components/Vendor/AddingVenuesForm'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import ViewVenues from './components/user/ViewVenues'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'
import SignIn from './components/Auth/Login'
import Register from './components/Auth/Register'
import EventDetials from './components/Vendor/EventDetails'
import BookedEvents from './components/user/BookedEvents'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState(null)

  return (
    <div>
      <Nav user={user} />
      <main>
        <Routes>
          {' '}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category_id" element={<ViewVenues />} />
          {/* should accept user */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/venues/newvenue" element={<AddingVenuesForm />} />
          <Route path="/bookedevents" element={<BookedEvents />} />
          <Route path="/eventdetails/:eventId" element={<EventDetials />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
