import { Event, Search,RssFeed, Chat, PlayArrow, PlayCircleFilled, Group, Bookmark, QuestionAnswer, WorkOffOutlined, WorkOutlined, School} from '@mui/icons-material'
import React from 'react'
import { User } from '../../dummydata'
import "./Leftbar.css"

function Leftbar() {
  return (
    <div className='Leftbar '>
     <div >
       <ul>
        <li className='items'>
            <RssFeed/>
            <span className='ml-2'>Feed</span>
        </li>
        <li className='items'>
            <Chat/>
            <span className='ml-2'>Chat</span>
        </li>
        <li className='items'>
            <PlayCircleFilled/>
            <span className='ml-2' >Vedio</span>
        </li>
        <li className='items'>
            <Group/>
            <span className='ml-2'>Group</span>
        </li>
        <li className='items'>
            <Bookmark/>
            <span className='ml-2'>Bookmark</span>
        </li>
        <li className='items'>
            <QuestionAnswer/>
            <span className='ml-2'>Question</span>
        </li>
        <li className='items'>
            <WorkOutlined/>
            <span className='ml-2'>Jobs</span>
        </li>
        <li className='items'>
            <Event/>
            <span className='ml-2'>Events</span>
        </li>
        <li className='items'>
           <School/>
            <span className='ml-2'>Courses</span>
        </li>
       </ul>
       <button className='btn ml-5'>Show More</button>
       <hr/>
       <ul>
       {User.map((user)=>(
        <li className='items mb-3'>
            <img className='Barimage mr-3' src={user.profilePicture} href="Following"/>
            <span>{user.username}</span>
        </li> 
       ))}
        <li className='items mb-3'>
            <img className=' Barimage mr-3' src='https://media.gettyimages.com/id/1287400198/photo/beautiful-afro-woman-with-perfect-make-up.jpg?s=612x612&w=gi&k=20&c=uHGW_9-YNTMD3JD-2QEuIN-j2_849glVQbW9ICGaLBs=' href="Following"/>
            <span>Rono</span>
        </li>
        <li className='items mb-3'>
            <img className='Barimage mr-3' src='https://media.gettyimages.com/id/1287400198/photo/beautiful-afro-woman-with-perfect-make-up.jpg?s=612x612&w=gi&k=20&c=uHGW_9-YNTMD3JD-2QEuIN-j2_849glVQbW9ICGaLBs=' href="Following"/>
            <span>Rono</span>
        </li>
        <li className='items mb-3'>
            <img className='Barimage mr-3' src='https://media.gettyimages.com/id/1287400198/photo/beautiful-afro-woman-with-perfect-make-up.jpg?s=612x612&w=gi&k=20&c=uHGW_9-YNTMD3JD-2QEuIN-j2_849glVQbW9ICGaLBs=' href="Following"/>
            <span>Rono</span>
        </li>
        <li className='items mb-3'>
            <img className='Barimage mr-3' src='https://media.gettyimages.com/id/1287400198/photo/beautiful-afro-woman-with-perfect-make-up.jpg?s=612x612&w=gi&k=20&c=uHGW_9-YNTMD3JD-2QEuIN-j2_849glVQbW9ICGaLBs=' href="Following"/>
            <span>Rono</span>
        </li>
       </ul>
     </div>
      
    </div>
  )
}

export default Leftbar
