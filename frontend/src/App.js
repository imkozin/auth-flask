import Login from "./components/Login";
import Register from "./components/Register";
import Employees from "./components/Employees";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
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
      </Routes>
    </div>
  )
}

export default App;
