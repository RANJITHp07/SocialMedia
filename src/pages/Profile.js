import React, { useContext, useEffect, useState } from 'react'
import Leftbar from '../component/Leftbar/Leftbar'
import Profilebar from '../component/Profilebar/Profilebar'
import Topbar from '../component/Topbar/Topbar'
import Feed from "../component/Feed/feed"
import Profilerightbar from '../component/Profilerightbar/Profilerightbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Authcontext } from '../context/Authcontext'

function Profile() {
   const useparams=useParams().username
   const[user,setuser]=useState({})
   useEffect(()=>{async function fetch(){
      const res= await axios.get(`/user/${useparams}`)
      setuser(res.data)
   }
   fetch()
   },[useparams])
   

  return (
    <div>
      <div>
      <Topbar/>
       <div className="row">
          <div className="col-2 p-0 mt-5">
             <Leftbar/>
          </div>
          <div className='col-10 p-0 m-0'>
             <Profilebar username={user}/>
             <div className='row'>
            <div className='col-7 ml-5 mr-2'>
                    <Feed username={useparams}/>
               </div>
               <div className='col-3'>
                    <Profilerightbar key={user._id} username={user} />
               </div>
             </div>
          </div>
          
       </div>
    </div>
    </div>
  )
}

export default Profile
