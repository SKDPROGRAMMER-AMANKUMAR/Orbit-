import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import { LogOut } from "lucide-react";
import { useChatStore } from "../lib/chatStore";
import { auth } from "../lib/firebase.js";
import "./detail/detail.css";
// import { useChatStore } from "../../lib/chatStore";
// import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const {chatId} = useChatStore();
  return (
    <>
    
    <div className="container">
     
      
      {/* {currentUser ? ( */}
      <List />
      {chatId && <Chat />}
      {chatId && <Detail />}
      {/* ) : ( */}
      {/* // <Login /> */}
      {/* )} */}

      <button 
  onClick={() => auth.signOut()} 
  style={{
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }}
>
  <LogOut size={20} />
  Logout
</button>

      
    </div>

    {/* <div className="container"> */}
      {/* {currentUser ? ( */}
      {/* <List /> */}
      {/* <Chat /> */}
      {/* <Detail /> */}
      {/* ) : ( */}
      {/* // <Login /> */}
      {/* )} */}
    {/* </div> */}

    {/* --------------------------------------------------------------------------------- */}

  

    
    </>
  );
};

export default Home;
