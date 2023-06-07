import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Topbar.css"
import {Search,Person,Chat,NotificationsActive} from "@mui/icons-material"
import { Authcontext } from '../../context/Authcontext'
import axios from 'axios';


const Topbar = ({blur}) => {
  const users=JSON.parse(localStorage.getItem("user"))
  const[searchuser,setsearchuser]=useState({})
  const username=useRef()

  async function click(){
    try{
     const res=await axios.get(`/user/${username.current.value}`)
     setsearchuser(res.data)
     blur(true,res.data)
     console.log(res.data)
    }catch(err){
       console.log(err)
    }
 }


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      click();
    }
  };

  
  return (
    <div className='Topbar mb-5 p-0 fixed-top'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand logo mr-5" href="/">Social media</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div class="input-group mb-1 ml-5">
           <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><Search/></span> 
        </div>
             <input type="text" class="form-control"  placeholder="Username" aria-label="Search" aria-describedby="basic-addon1" ref={username} onKeyDown={handleKeyDown} />
          </div>
          
          <div className="collapse navbar-collapse col-4" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active mr-5">
                <span className=''>HomePage</span>
                <span className='ml-2'>Timeline</span>
              </li>
              <li className="nav-item mr-1">
                <Person/>
                <span className='notification'>1</span>
              </li>
              <li className="nav-item mr-1">
                <Link to={`/chat/${users.username}`} htmlColor='white' ><Chat/></Link>
                <span>1</span>
              </li>
              <li className="nav-item mr-1">
                <NotificationsActive/>
                <span>1</span>
              </li>

              <li className="nav-item ml-3">
                <Link to={`/profile/${users.username}`}><img className='Barimage' src={users.profilePicture} href="Profilephoto" alt=''/></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
  )
}

export default Topbar
