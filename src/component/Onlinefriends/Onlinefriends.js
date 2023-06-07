import React from 'react'
import {User} from "../../dummydata"

function Onlinefriends() {
  return (
    <div>
    <ul>
       { User.map((user)=>(
        <li className='items mb-3'>
          <div style={{display:'inline'}}>
          <span className='indication'> </span>
          <img className='Barimage mr-3' src={user.profilePicture} href="Following"/>
            <span>{user.username}</span>
          </div>
        </li>
       ))

       }
       </ul>
    </div>
  )
}

export default Onlinefriends
