import React, { useState } from 'react'
import { useContext } from 'react'
import Feed from '../component/Feed/feed'
import Leftbar from '../component/Leftbar/Leftbar'
import Rightbar from '../component/Rightbar/Rightbar'
import Topbar from '../component/Topbar/Topbar'
import { Authcontext } from '../context/Authcontext'

function Home() {
   const [blur,setblur]=useState(false)
   const[user,setuser]=useState({})
   const handledata=(bool,users)=>{
      setblur(bool)
      setuser(users)
   }
  return (
    <div>
    <div style={blur ? { filter: "blur(5px)" } : null}>
    <Topbar blur={handledata}/>
    </div>
       <div className="row" style={{marginTop:"5rem"}}>
          <div className="col-lg-2 col-md-0 col-sm-1 mr-0">
             <Leftbar/>
          </div>
          <div className="col-lg-7 col-sm-6">
            <Feed/>
          </div>
          <div className="col-lg-3 col-sm-3">
             <Rightbar/>
          </div>
       </div>
    </div>
  )
}

export default Home
