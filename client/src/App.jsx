import './App.css'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import ViewVenues from './components/user/ViewVenues'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'
// import Invitation from './components/Invitation'
import VenueBookingForm from './components/user/VenueBookingForm'
import SignIn from './components/Auth/Login'
import Register from './components/Auth/Register'

const App = () => {
  // temporary
  const user = null

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
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/categories/:category_id/venues/:venue_id/newEvent" element={<VenueBookingForm user={user} />} />
          {/* <Route
            path="/invitation"
            element={
              <Invitation
                invitationMessage="You are invited!"
                invitationLink={window.location.href}
              />
            }
          /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
