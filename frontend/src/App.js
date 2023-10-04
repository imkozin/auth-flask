import Login from './pages/Login'
import Register from './pages/Register'
import Team from './pages/Team'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Organization from './pages/Organization'
import { Routes, Route } from 'react-router-dom'
import Page404 from './pages/PageNotFound'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Team />} />
        <Route path="/orgs" element={<Organization />} />
        <Route path='/404' element={<Page404/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
