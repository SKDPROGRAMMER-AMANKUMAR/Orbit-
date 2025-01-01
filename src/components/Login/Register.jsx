import React, { useState } from 'react'
import "./Login.css"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../../lib/firebase.js'
import { doc,setDoc } from 'firebase/firestore'
import {storage} from '../../lib/Appwriteconfig.js'
import { updateProfile } from 'firebase/auth';
import { ID } from 'appwrite'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [Loading,setLoading] = useState(false)
        const  [avatar,setAvatar] = useState({
            file:null,
            url:''
        })
        const navigate = useNavigate();

        const handleAvatar = (e) => {
            if(e.target.files[0]){
                setAvatar({
                    file:e.target.files[0],
                    url:URL.createObjectURL(e.target.files[0])
                });
            }
        }

        const handleRegister = async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.target);
            const { name, email, password } = Object.fromEntries(formData);
        
            try {
              // Firebase Authentication
              const response = await createUserWithEmailAndPassword(auth, email, password);
              console.log("User registered:", response);
        
              // Update user profile with name
              await updateProfile(auth.currentUser, { displayName: name });
        
              // Initialize avatarUrl to empty string
              let avatarUrl = "";
              try {
                if (avatar.file) {
                  const file = avatar.file;
        
                  // Uploading file to Appwrite Storage
                  const uploadResponse = await storage.createFile(
                    import.meta.env.VITE_APPWRITE_BUCKET_ID, // Replace with actual Bucket ID
                    ID.unique(), // Unique file ID
                    file // The file to upload
                  );
        
                  console.log("Upload response:", uploadResponse);
        
                  // Construct avatar URL
                  if (uploadResponse.$id) {
                    const fileId = uploadResponse.$id;
                    avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
                  } else {
                    throw new Error("Failed to upload file: No file ID returned.");
                  }
                }
              } catch (uploadError) {
                console.error("File upload failed:", uploadError);
                toast.error(`Failed to upload avatar: ${uploadError.message || uploadError}`);
              }
        
              // Save user data in Firestore
              await setDoc(doc(db, "users", response.user.uid), {
                name,
                email,
                id: response.user.uid,
                avatarUrl,
                blocked: [],
              });
        
              await setDoc(doc(db, "userchats", response.user.uid), { chats: [] });
        
              toast.success("Account created! You can login now!");
              e.target.reset();
              setLoading(false);
              setAvatar({ file: null, url: "" });
              navigate("/login");
            } catch (error) {
              console.error("Error during registration:", error);
              toast.error(`Registration failed: ${error.message}`);
            }
          };

  return (
    <>
    {/* <div className='item'>
      <h2>Create an Account</h2>
         <form onSubmit={handleRegister}>
            <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="avatar" />
                Upload an image </label>

            <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
            <input type="text" placeholder='Name' name='name' />
            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button>{Loading ? 'Loading...':'Sign Up'}</button>
         </form>
         <p>Already have an account? 
            <Link to="/login">
            <span style={{color:"blue"}}>Login</span>
            </Link>
         </p>
      </div> */}

      {/* ----------------------------------------------------------------------- */}

      <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff'
    }} className='item'>
      <h2 style={{
        textAlign: 'center',
        color: '#333333',
        marginBottom: '24px',
        fontSize: '24px',
        fontWeight: '600'
      }}>Create an Account</h2>
      
      <form onSubmit={handleRegister} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <label htmlFor="file" style={{
          cursor: 'pointer',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          <img 
            src={avatar.url || "./avatar.png"} 
            alt="avatar" 
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 8px',
              display: 'block',
              border: '2px solid #e1e1e1'
            }}
          />
          <span style={{
            color: '#666666',
            fontSize: '14px'
          }}>Upload an image</span>
        </label>

        <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
        
        {['name', 'email', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            style={{
              padding: '12px 16px',
              borderRadius: '6px',
              border: '1px solid #e1e1e1',
              fontSize: '16px',
              transition: 'border-color 0.2s',
              outline: 'none',
              '&:focus': {
                borderColor: '#007bff'
              }
            }}
          />
        ))}

        <button style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '12px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: '#0056b3'
          }
        }}>
          {Loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <p style={{
        textAlign: 'center',
        marginTop: '16px',
        color: '#666666',
        fontSize: '14px'
      }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span style={{
            color: '#007bff',
            fontWeight: '500',
            ':hover': {
              textDecoration: 'underline'
            }
          }}>Login</span>
        </Link>
      </p>
    </div>

      </>
  )
}

export default Register
