import React from 'react'
import useClient from '../hook/useClient'
import { NavLink, useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate()
  let client = new useClient();
  const logout = () => {
    client.logout()
      .then((response) => {
        sessionStorage.clear()
        navigate("/")
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.message)
        }
      })
  }

  return (
    <div>
      <h1 className='text-center'>VISTA DE LA HOME CUANDO YA ESTAS LOGIN</h1>
      <button type="button" onClick={logout}>Logout</button>
      <NavLink className="nav-link active"  to="/user">Pagina para user</NavLink >
      <NavLink className="nav-link active"  to="/owner">pagina para owner</NavLink >    

    </div>
  )
}

export default Home
