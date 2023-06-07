import { Comment, Favorite, MoreVert, Delete } from '@mui/icons-material'
import React, { useEffect, useState,useRef } from 'react';
import axios from "axios"
import "./Post.css";
import {format} from "timeago.js"
import { Link, useNavigate } from 'react-router-dom';

function Post({post}) {
 
  const user=JSON.parse(localStorage.getItem("user"))
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  const [likes,setlikes]=useState(post.likes.length);
  const [users,setuser]=useState({})
  const[touch,settouch]=useState(true)
  const[ctouch,setctouch]=useState(false)
  const [comment,setcomment]=useState(post.comment)
  const comments=useRef()
  const k=0;
  console.log(PF+post.img)
  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`/${post.userId}`);
      setuser(res.data)
    }
    fetch()
  },[])

  function commentclick(){
       setctouch(!ctouch)
  }

  async function click(){
    try{
        await axios.put(`like/${post._id}`,{userId:user._id})
      }
    catch(err){}
    setlikes(touch ? likes+1 :likes-1)
    settouch(!touch)
}
const deleteclick=(index)=>{
  comment.splice(index, 1)
  
  console.log(comment)
}
const handleKeyDown = async (event) => {
  if (event.key === "Enter") {
     setcomment([...comment,comments.current.value])
    await axios.put(`/comments/${post._id}`,{comment:comments.current.value})
     console.log(comment)
  }
};

  return (
    <div className='Post'>
    <div>
    <div>
      <Link to={`/profile/${users.username}`}><img  className='Barimage' src={users.profilePicture=="" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png":users.profilePicture} href="Profilephoto"/></Link>
      <span className='ml-3 mt-3'>{users.username}</span>
      <span className='time'>{format(post.createdAt)}</span>
      <MoreVert className='float-right'/>
      <hr/>
      </div>
      <div>
        <h6>{post.desc}</h6>
      </div>
      <div>
      <img className='img-fluid'  src={"/images/"+post.img} alt="ProfilePicture"/>
        <div>
      <Favorite className='mt-3 ml-2'  onClick={click}/>
      <span>{likes}likes</span>
      <span className='float-right mt-3'>{comment.length}<Comment onClick={()=>{commentclick()}}/></span>
      {
        ctouch && <>
        <div className='m-3'>
         <p>Comments</p>
       {comment.map((c,index)=>(
          <div className='row'>
           <div className='mr-3'>
           <Link to={`/profile/${user.username}`}><img className='Barimage' src={users.profilePicture} href="Profilephoto" alt=''/></Link>
           </div>
           <div>
           <span style={{fontSize:"10px"}}>{user.username}</span>
         <p>{c}</p>
           </div>
           <div className='float-right ml-auto'>
          <span onClick={()=>{deleteclick(index)}}><Delete/></span>
          </div>
         </div>
         ))}
       </div>
       {
         (post.userId!==user.id) && <>
         <div className='mr-3'>
          <input type='text' ref={comments} onKeyDown={handleKeyDown} className='form-control' />
        </div>
         </>
       }
        </>
      } 
      
      </div>
      </div>
    </div>
    </div>
  )
}

export default Post
