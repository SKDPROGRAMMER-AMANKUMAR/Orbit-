import React from 'react'
import "./userinfo.css";
import {useUserStore} from "../../../lib/userStore.js"
const Userinfo = () => {

  const { currentUser } = useUserStore();
// console.log("The current name from Userinfo is: " + currentUser)

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatarUrl || "./avatar.png"} alt="" />
        <h3 className='headingName'>{currentUser.name}</h3>
      </div>
      <div className='icons'>
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  )
}

export default Userinfo
