// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orbit-dcadf.firebaseapp.com",
  projectId: "orbit-dcadf",
  storageBucket: "orbit-dcadf.firebasestorage.app",
  messagingSenderId: "210273450040",
  appId: "1:210273450040:web:d6d7c0b17bf956f8d7cecd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

//Appwrite Configuration
