import { Search } from '@mui/icons-material'
import React, { useEffect,useState } from 'react'
import "./Conversation.css"
import axios from 'axios'

function Conversation({conversation}) {
const[user,setuser]=useState({})
useEffect(()=>{
    async function fetch(){
    const res=await axios.get(`/${conversation}`)
    setuser(res.data)
    }
    fetch()
},[])

  return (
<div className='mt-2'>
    <div className='mb-4'>
    <img className='chatimg mr-3 ml-3' src={user.profilePicture}/>
    <span>{user.username}</span>
</div>
    
</div>
 
  
  )
}

export default Conversation
