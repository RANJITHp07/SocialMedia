import React, { useContext, useRef,useState,useEffect } from 'react'
import { Authcontext } from '../../context/Authcontext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./updateform.css"
import Topbar from '../Topbar/Topbar';
import Leftbar from '../Leftbar/Leftbar';

function Updateform() {
    const user=JSON.parse(localStorage.getItem("user"))
    const email=useRef(user.email);
    const username=useRef(user.username);
    const city=useRef(user.city);
    const [pfile, setpFile] = useState(null)
    const [cfile, setcFile] = useState(null)
    const navigate=useNavigate()
    const submit= async (e) => {
            e.preventDefault();
            const users={
                username:username.current.value|| user.username,
                email:email.current.value || user.email,
                city:city.current.value || user.city
            }
            if(pfile){
                const data=new FormData();
                const fileName=Date.now() + pfile.name
                data.append("profilefile",pfile)
                data.append("name",fileName)
                users.profilePicture=fileName
            
            try{
              await axios.post("/auth/profileuploads", data)
            }catch(err){
              console.log(err)
            }
          }
          else if(cfile){
            const data=new FormData();
            const fileName=Date.now() + cfile.name
            data.append("coverfile",pfile)
            data.append("name",fileName)
            users.coverPicture=fileName
        
        try{
          await axios.post("/auth/coveruploads", data)
        }catch(err){
          console.log(err)
        }
      }
      
            try{
              await axios.put(`/${user._id}`,users)
              navigate(`/profile/${user.username}`)
            }catch(err){
        
            }
        };
    
  return (
    <div className='form'>
       <Topbar/>
       <h1 className='text-center'>Update your details</h1>
       <form onSubmit={submit}>
       <input type="type" class="form-control mb-3 mr-3" placeholder={user.username} ref={username}/>
       <input type="email" class="form-control mb-3" placeholder={user.email} ref={email}/>
       <span className='ml-3'>Profile Picture:</span>
       <input type="file" name="profilefile" class=" mb-3" onChange={(e) => setpFile(e.target.files[0])}/>
       <span className='ml-3'>Cover Picture:</span>
       <input type="file" name="coverfile" class=" mb-3" onChange={(e) => setcFile(e.target.files[0])}/>
       <input type="text" class="form-control mb-3" placeholder={user.city} ref={city}/>
       <button className='btn btn-primary' type='submit'>Submit</button>
       </form>
    </div>
  )
  }

export default Updateform
