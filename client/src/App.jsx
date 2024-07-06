import './App.css'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'

const App = () => {
  return (
    <div>
      {/* nav */}
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
