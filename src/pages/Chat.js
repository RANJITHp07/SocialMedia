import React, { useContext, useState,useEffect, useRef } from 'react'
import Conversation from '../component/Conversation/Conversation'
import Message from '../component/Message/Message'
import Topbar from '../component/Topbar/Topbar'
import { Authcontext } from '../context/Authcontext'
import axios from 'axios'
import Rightbar from '../component/Rightbar/Rightbar'
import io from "socket.io-client"

function Chat() {
    const user=localStorage.getItem("user")
    const [conversation,setconversation]=useState([])
    const[currentchat,setcurrentchat]=useState(null)
    const socket=useRef(io("ws://localhost:8000"))
    const[message,setmessage]=useState([])
    const chat=useRef()

   const submit=async (e)=>{
      e.preventDefault()
      try{
        const messages={
          conversationId:currentchat._id,
          sender:user._id,
          text:chat.current.value
        }
        const res=await axios.post("/message",messages)
        setmessage([...message,res.data])
      }catch(err){console.log(err)}
   }

   

   useEffect(()=>{
    if (socket !== null && socket !== undefined) {
       socket.current.emit("adduser",user._id)
       socket.current.on("getuser",(u)=>{
            console.log(u)
       })
    }else{
      console.log("error")
    }
   },[socket,user._id])

    useEffect(()=>{
        async function fetch(){
            const res=await axios.get(`/conversation/${user._id}`)
            setconversation(res.data)   
        }
        fetch()
    },[user._id])
    useEffect(() => {
      async function fetchmessage() {
        try {
          const res = await axios.get(`/message/${currentchat._id}`);
          setmessage(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    
      if (currentchat) {
        fetchmessage();
      }
    }, [currentchat]);
  return (
    <div>
      <Topbar/>
      <div className='row'>
        <div className='col-3'>
        <div className='mt-5 mr-2 ml-2'>
       <div class="input-group mb-3">
  <input  type="text" placeholder= 'Serach for your friends' class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
</div>
</div>
     <div className='mt-5 ml-3'> 
     {conversation.map((c)=>(
      <div onClick={()=>{setcurrentchat(c)}}>
      <Conversation key={c._id} conversation={c.members[1]}/>
      </div>
     ))}
     </div>
      </div>
      <div className='col-6'>
      {
      currentchat ? <>
           { message.map((m)=>(
            <Message message={m} own={m.sender===user._id}/>
           ))

           }
      </> :<span>Open a new chat</span>
     }
     <div className='fixed-bottom bg-light p-3 col-lg -6 d-flex justify-content-center align-items-center'>
     <form onSubmit={submit}>
      <input className='form-control' type="text" placeholder='Enter the message' ref={chat}/>
      <button className='btn btn-primary' type='submit'>Send</button>
     </form>
     </div>
     </div>
        <div className='col-3'>
          <Rightbar/>
        </div>
      </div>
    </div>
  )
}

export default Chat
