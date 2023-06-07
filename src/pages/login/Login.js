import React,{useContext, useEffect, useRef} from 'react'
import { Authcontext } from '../../context/Authcontext';
import { logincall } from '../../loginApi';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import jwt_decode from "jwt-decode"
import "./login.css"

function Login() {
  const password=useRef();
  const email=useRef()
  const {user,isFetching,err,dispatch}=useContext(Authcontext)
  const navigate=useNavigate()
  const click=(e)=>{
    e.preventDefault();
    logincall({email:email.current.value,password:password.current.value},dispatch,navigate)
    console.log(password.current.email)
    console.log(user)
  }
  function callbackResponse(response){
    console.log(response.credential)
    const obj= jwt_decode(response.credential)
    logincall({email:obj.email,password:obj.sub},dispatch,navigate)
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"179630257553-o0hrh6govm0nvoo5jc6udr5nm7nashlo.apps.googleusercontent.com",
      callback:callbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signin"),
      {theme:"outline",size:"xlarge"}
    )
  },[])
  return (
    <div className='main'>
      <div className='container'>
      <div className='row login'>
          <div className='col-lg-5 ml-3 mr-5 mt-5  lheading'>
               <h1 className='text-primary'>Social Media</h1>
               <p>Connect with the whole world through Social Media</p>
          </div>
          <div className='col-lg-4 ml-5 lform mb-5 mr-5'>
              <form className='mr-3 mt-5' onSubmit={click}>
              <input type="email" class="form-control mb-3" placeholder="Email" ref={email} required/>
              <input type="password" class="form-control mb-3 " placeholder="Password" required minLength={6} ref={password}/>
              <button className='btn btn-primary ml-3 mb-3 btn-block'>{isFetching? <CircularProgress color='inherit' />:"Log in"}</button>
              </form>
               <div id="signin" className='d-flex justify-content-center mb-3'></div>
               <Link><p className='text-center'>Forgot password?</p></Link>
               <Link to="/register"><button className='btn btn-success  btn-block'>{isFetching? <CircularProgress color='inherit' />:"Create a new account"}</button></Link>
          </div>
      </div>
    </div>
    </div>
    
    
  )
}

export default Login
