import React,{useState,useEffect, useContext} from 'react'
import "./Profilerightbar.css"
import {User} from "../../dummydata"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Authcontext } from '../../context/Authcontext';
import { Add, PersonRemove, Remove } from '@mui/icons-material';

function Profilerightbar({username}) {
  const [user,setuser]=useState([]);
  const curruser=JSON.parse(localStorage.getItem("user"))
  console.log(curruser)
  const [follow,setfollow]=useState()
  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`/allfriends/${username._id}`)
      setuser(res.data)
      console.log(user)
    }
    fetch()
},[username._id])
useEffect(()=>{
   function follows(){
    if(!curruser.following.includes(username._id)){
      setfollow(true)
    }
    else{
      setfollow(false)
    }
   }
   follows()
},[username._id])

async function click(){
  try{
    if(!follow){
          await axios.put(`/${user._id}/unfollow`,{userId:curruser._id})
    }
    else{
      await axios.put(`/${user._id}/follow`,{userId:curruser._id})
    }
    
  }catch(err){
    console.log(err)
  }
  setfollow(!follow)
}

  
  return (
    <div className='profilerightbar'>
    {username.username!==curruser.username && <button className='btn btn-primary mb-2' onClick={()=>{click()}} style={{display:"flex",alignText:"center"}}>
    { follow ? "Follow ":"Unfollow"}
    { follow ? <Add/>:<PersonRemove/>}
    </button>}
        <h5><b>User Information</b></h5>
        <div>
         <span>Followers: </span>
         {username.followers && <span>{username.followers.length}</span>}
        </div>
        <div>
         <span>Following: </span>
         {username.followers && <span>{username.following.length}</span>}
        </div>
        <div>
         <span>City: </span>
         <span>{username.city}</span>
        </div>
        <hr></hr>
        <div>

    <h5><b>User Friends</b></h5>
            <div className='row'>
            {
             user.map((u)=>((
                <div className='col-4'>
                <Link to={`/profile/${u.username}`}>
                    <img className='friendsimg mr-2' src={u.profilePicture}/>
                </Link>
                   <p>{u.username}</p>
                </div>
             )))}
            </div> 
        </div>
    </div>
  )
}

export default Profilerightbar
