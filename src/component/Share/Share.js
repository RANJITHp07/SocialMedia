import { AddToPhotos, Cancel, EmojiEmotions, Label, LocationOn } from '@mui/icons-material'
import React, { useContext, useRef, useState } from 'react';
import "./Share.css";
import axios from "axios"

function Share() {
 const  user=JSON.parse(localStorage.getItem("user"))
  console.log(user._id)
  const desc=useRef()
  const [file, setFile] = useState(null)

  const handleSubmit=async (e) => {
    e.preventDefault();
    const newPost={
      userId:user._id,
      desc:desc.current.value
    }
    console.log(file)
    if(file){
        const data=new FormData();
        const fileName=Date.now() + file.name
        data.append("file_name",file)
        data.append("name",fileName)
        newPost.img=fileName
    
    try{
      await axios.post("/auth/uploads", data)
    }catch(err){
      console.log(err)
    }
  }
    try{
      await axios.post('/auth/post',newPost)
      window.location.reload()
    }catch(err){

    }
};
  return (
    <div className='Share'>
      <div>
        <div>
          <img className='Barimage' src={user.profilePicture} href="Profilephoto" alt='' />
            <input placeholder='What is in your mind' type="text" ref={desc}></input>
            <hr />
            {
              file &&
              <div>
                <img className='img-fluid' src={URL.createObjectURL(file)}/>
                <Cancel className='float-right' onClick={()=>{
                    setFile(null)
                }}/>
              </div>
            }
            <form onSubmit={handleSubmit} enctype="multipart/form-data" method="POST" className='mt-3'>
            <div className='row'>
              <div className='col-lg-2'>
              <label>
              <AddToPhotos htmlFor="file_name" htmlColor='tomato' className='ml-1' />
              <span>Photo</span>
             <input style={{ display: "none" }} type="file" name='file_name' accept='.png,.jpg,.jpeg,.JPG' onChange={(e) => setFile(e.target.files[0])} />
            </label>
              </div>
              <div className='col-lg-2'>
              <Label htmlColor='blue' className='ml-1' />
            <span>Tag</span>
              </div>
              <div className='col-lg-2'>
              <LocationOn htmlColor='green' className='ml-1' />
            <span>Location</span>
              </div>
              <div className='col-lg-2'>
              <EmojiEmotions htmlColor='goldenrod' className='ml-1' />
            <span>Feelings</span>
              </div>
              <div className='col-lg-3'>
              <button type='submit' className='btn float-right' >Share</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Share;
