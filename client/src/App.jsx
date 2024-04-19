import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./view/Login"
import Register from "./view/Register"
import Home from "./view/Home";
import Owner from "./view/HomeOwner"
import User from "./view/HomeUser"
import { PrivateRoutes, PublicRoutes } from "./components/Route";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/owner" element={
            <PrivateRoutes>
              <Owner />
            </PrivateRoutes>
          } />
          <Route path="/user" element={
            <PublicRoutes>
              <User />
            </PublicRoutes>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
