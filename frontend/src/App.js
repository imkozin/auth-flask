import Login from "./components/Login";
import Register from "./components/Register";
import Employees from "./components/Employees";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/users' element={<Employees/>}/>
          <Route path='/form' element={<Form/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
