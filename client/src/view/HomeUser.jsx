import React from 'react'
import useClient from '../hook/useClient'
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate()
    let client = new useClient();
    const logout = () => {
        client.logout()
        .then((response) => {
            console.log(response)
            navigate("/")
        })
        .catch((error) => {
            if (error.response){
                console.log(error.message)
            }
        })
    }

  return (
    <div>
      <h1 className='text-center'>VISTA DE LA HOME CUANDO YA ESTAS LOGIN Y sos user</h1>
      <button type="button" onClick={logout}>HOALKSDA</button>
    </div>
  )
}

export default Home
