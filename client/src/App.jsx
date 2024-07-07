import './App.css'
import Venue from './components/Vendor/AddingVenuesForm'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import ViewVenues from './components/user/ViewVenues'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'
import SignIn from './components/Auth/Login'
import Register from './components/Auth/Register'

import VenueDetails from './components/user/VenueDetails'
import About from './components/About'
import Home from './components/Home'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
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
      <Nav user={user} handleLogOut={handleLogOut} />
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
          <Route
            path="/categories/:category_id/venues/:venue_id"
            element={<VenueDetails />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </main>
    </div>
  )
}

export default App
