import Login from "./components/Login";
import Register from "./components/Register";
import Employees from "./components/Employees";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/users' element={<Employees/>}/>
      </Routes>
    </div>
  )
}

export default App;
