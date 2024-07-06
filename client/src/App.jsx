import './App.css'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import Dashboard from './components/DashBoard'

const App = () => {
  return (
    <div>
      {/* nav */}
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          {/* should accept user */}
          <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App
