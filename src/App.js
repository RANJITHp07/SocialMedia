import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import React, { useContext } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from './pages/login/Login';
import Register from './pages/Register';
import { Authcontext } from './context/Authcontext';
import Chat from './pages/Chat';
import Updateform from './component/updateform/updateform';


function App() {
  const {user}=useContext(Authcontext)
  const bool=localStorage.getItem("user")
  return (
    <Router>
    <Routes>
    <Route path="/" element={bool?<Home/>:<Login/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/chat/:username" element={<Chat/>}/>
    <Route path="/register" element={<Register/>} />
    <Route path="/profile/:username" element={<Profile/>} />
    <Route path="/update" element={<Updateform/>} />
    </Routes>
  </Router>
  );
}

export default App;
