import React, { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import { useUserStore } from "./lib/userStore.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoutes from "./PrivateRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
function App() {
  // const [count, setCount] = useState(0)

  const { currentUser, Loading, fetchUserInfo } = useUserStore();

  // const user = false;
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>

      {/* */}
      <Notification />
    </>
  );
}

export default App;
