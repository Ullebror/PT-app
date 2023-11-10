import {Link, Outlet } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <>
      <nav>
        <Link to={"/"}>Customers</Link>
        <Link to={"/Trainings"}>Training</Link>
      </nav>
      <Outlet />      
    </>
  )
}

export default App
