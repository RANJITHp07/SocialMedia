import { Cake } from '@mui/icons-material'
import React from 'react'
import "./Rightbar.css";
import {User} from "../../dummydata"
import Onlinefriends from '../Onlinefriends/Onlinefriends';

function Rightbar() {
  return (
    <div className='Rightbar'>
       <div className='mb-3'>
         <Cake className='cake mr-2'/>
         <span><b>Pole</b> and <b> 3 other friends</b>  have birthday today....</span>
       </div>
       <div>
           <img className='image mb-5' src='https://imgv3.fotor.com/images/blog-cover-image/Birthday-cake-with-candles.jpg'/>
       </div>
       <div>
         <h5>Online Friends</h5>
         <hr/>
       </div>
       <div>
        <Onlinefriends/>
       </div>
    </div>
  )
}

export default Rightbar
