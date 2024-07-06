import './App.css'
import { Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
//import ViewVenues from './components/user/ViewVenues'
const App = () => {
  return (
    <div>
      {/* nav */}
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/categories" element={<Categories />} />
          {/* <Route path="/categories/:category_id" element={<ViewVenues />} />*/}
        </Routes>
      </main>
    </div>
  )
}

export default App
