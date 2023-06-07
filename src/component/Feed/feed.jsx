import React, { useContext, useEffect, useState} from 'react'
import axios from "axios"
import Post from '../Post/Post'
import Shared from '../Share/Share'
import "./feed.css";
import {Postdata} from "../../dummydata"
import { Authcontext } from '../../context/Authcontext';

function Feed({username}) {
  const [posts,setposts]=useState([]);
  const {user}=useContext(Authcontext)
  const users=JSON.parse(localStorage.getItem("user"))
  
  useEffect(()=>{ async function fetchdata(){
    
    const res= username ? await axios.get(`/post/`+username): await axios.get(`/all/${users._id}`)
    setposts(res.data.sort((p1,p2)=>{
      return(new Date(p2.createdAt)-new Date(p1.createdAt))
}))
  };
   fetchdata()
},[username,users._id])


  return (
    <div className='Feed'>
    {(!username||username===users.username) && <Shared/> }
       { posts.map((post)=>(
        <Post key={post._id} post={post}/>
       ))}
    </div>
  )
}

export default Feed
