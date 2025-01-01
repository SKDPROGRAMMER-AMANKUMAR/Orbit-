import React, { useState } from 'react'
// import "./Login.css"
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../../lib/firebase.js'
import { doc,setDoc } from 'firebase/firestore'
import {storage} from '../../lib/Appwriteconfig.js'
import { updateProfile } from 'firebase/auth';
import { ID } from 'appwrite'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [Loading,setLoading] = useState(false)
    const navigate = useNavigate();
    // const  [avatar,setAvatar] = useState({
    //     file:null,
    //     url:''
    // })

    // const handleAvatar = (e) => {
    //     if(e.target.files[0]){
    //         setAvatar({
    //             file:e.target.files[0],
    //             url:URL.createObjectURL(e.target.files[0])
    //         });
    //     }
    // }

    const handleLogin = async(e) => {
        e.preventDefault()
        setLoading(true);

        const formData = new FormData(e.target);
        const {email,password} = Object.fromEntries(formData);

        try {
          const response =   await signInWithEmailAndPassword(auth,email,password);
            console.log("The login data is:",response)
            toast.success('Login successful')
            navigate('/');
          } catch (error) {
            console.log(error)
            toast.error('Failed to login')
          } finally {
            setLoading(false);
            e.target.reset();
        }
        // toast.success('Login successful')
    }

  return (
    <>
    {/* <div className='login'>
      <div className='item'>
         <h2>Welcome back,</h2>
         <form onSubmit={handleLogin}>
            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button>{Loading ? "Loading...":'Sign In'}</button>
         </form>
      </div>
      <div>Don't have an account? 
        <Link to="/register">
        <span style={{color:"blue"}}>Register</span>
        </Link>
        </div>
      
    </div> */}

{/* ----------------------------------------------------------/ */}
<div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          // value={formData.email}
          // onChange={handleInputChange}
          style={{
            marginBottom: "15px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ced4da",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          // value={formData.password}
          // onChange={handleInputChange}
          style={{
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ced4da",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {Loading ? "Loading...":'Sign In'}
        </button>
      </form>
      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Don’t have an account?{" "}
        <Link to="/register">
        <span
          style={{
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Register
        </span>
        </Link>
      </p>
    </div>

</>
  )
}

export default Login
