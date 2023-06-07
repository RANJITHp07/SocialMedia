import React from 'react'
import { Link } from 'react-router-dom'
import "./Profilebar.css"

function Profilebar({username}) {
  
  return (
    <div className='mt-5 p-0'>
    <div className='profileheader'>
    <img className='imageheader' src={username.coverPicture ? username.coverPicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
     <Link to={"/update"}><button className='btn btn-primary float-right mt-3 mr-5'>Update Profile</button></Link>
      <img className='imageprofile' src={username.profilePicture ? username.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
    </div>
      <div className='profiledesc'>
        <h3>{username.username}</h3>
      </div>
    </div>
  )
}

export default Profilebar
