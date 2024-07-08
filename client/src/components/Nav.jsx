// navbar
import { NavLink, Link } from "react-router-dom"

// { user, handleLogOut }
const Nav = ({ user, handleLogOut }) => {
  return (
    <header>
      <h3 className="title"> VenueWiz</h3>
      <NavLink className="">
        {/* <h3 className="title"> VenueWiz</h3> */}
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about" end>
          About
        </NavLink>
        {user ? (
          // vendor nav
          user.type === true ? (
            <>
              <NavLink to="/myVenue">
                <h3>My Venues</h3>
              </NavLink>
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
              <Link onClick={handleLogOut} to="/" end>
                Logout
              </Link>
            </>
          ) : (
            // normal user nav
            <>
              <NavLink to="/categories" end>
                Venues
              </NavLink>
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
              <NavLink onClick={handleLogOut} to="/" end>
                Logout
              </NavLink>
            </>
          )
        ) : (
          // guest nav
          <>
            <NavLink to="/categories" end>
              Venues
            </NavLink>
            <NavLink id="register" to="/register" end>
              Register
            </NavLink>
            <NavLink id="login" to="/login" end>
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav
