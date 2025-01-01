import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import { useChatStore } from "../lib/chatStore";
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
