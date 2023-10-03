import Login from "./components/Login";
import Register from "./components/Register";
import Team from "./components/Team";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import Organization from "./components/Organization";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/users' element={<Team/>}/>
          <Route path='/orgs' element={<Organization/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App;
