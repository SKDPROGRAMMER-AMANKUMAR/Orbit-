import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useUserStore } from './lib/userStore';
import { PulseLoader } from 'react-spinners'
const PrivateRoutes = () => {
    // const navigate = useNavigate();
    const {currentUser,Loading,fetchUserInfo} = useUserStore();
    if(Loading) return <div className='loading' > <PulseLoader color='blue' /> </div>
  return (
    <div>
      {currentUser ? <Outlet/> : <Navigate to="/login"  />}
    </div>
  )
}

export default PrivateRoutes
