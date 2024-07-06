import './App.css'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import Dashboard from './components/DashBoard'
import Nav from './components/Nav'

const App = () => {
  // temporary
  const user = null

  return (
    <div>
      <Nav user={user} />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          {/* should accept user */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
