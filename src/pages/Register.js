import React,{useContext, useRef,useEffect,useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { Authcontext } from '../context/Authcontext';

function Register() {
  const{isFetching}=useContext(Authcontext)
    const password=useRef();
  const email=useRef()
  const repassword=useRef();
  const username=useRef()
  const navigate=useNavigate()
  const click=async (e)=>{
    e.preventDefault();
    if(password.current.value===repassword.current.value){
        const user={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value
        }
        try{
           await axios.post("/auth/register",user)
           navigate("/login")
        }catch(err){
            console.log(err.message)
        }
    }
    else{
      password.current.setCustomValidity("Password don't match ")
    }
  }
  async function callbackResponse(response){
    console.log(response.credential)
    const obj= jwt_decode(response.credential)
    console.log(obj)
    const user={
      username:obj.given_name,
      email:obj.email,
      password:obj.sub
  }
  console.log(user)
  try{
    await axios.post("/auth/register",user)
    navigate("/")
 }catch(err){
   console.log(err)
 }
}

 

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"179630257553-o0hrh6govm0nvoo5jc6udr5nm7nashlo.apps.googleusercontent.com",
      callback:callbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signin"),
      {theme:"outline",size:"larger"}
    )
  },[])

  return (
    <div>
      <div className='container'>
      <div className='row login'>
          <div className='col-lg-5 ml-3 mr-5 mt-5  lheading'>
               <h1 className='text-primary'>Social Media</h1>
               <p>Connect with the whole world through Social Media</p>
          </div>
          <div className='col-lg-4 ml-5 lform mb-5 mr-5'>
              <form className='mr-3 mt-5' onSubmit={click}>
              <input type="text" class="form-control mb-3" placeholder="Username" ref={username} required/>
              <input type="email" class="form-control mb-3" placeholder="Email" ref={email} required/>
              <input type="password" class="form-control mb-3 " placeholder="Password" required minLength={6} ref={password}/>
              <input type="password" class="form-control mb-3 " placeholder="Re-password" required minLength={6} ref={repassword}/>
              <button className='btn btn-primary ml-3 mb-3 btn-block' type='submit'>{isFetching? <CircularProgress color='inherit' />:"Submit"}</button>
              </form>
              <div id='signin' className='d-flex justify-content-center mb-3'></div>
              <div className='text-center'>
              <Link to="/login"><button className='btn btn-success '>{isFetching? <CircularProgress color='inherit' />:"Log into account"}</button></Link>
              </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Register
