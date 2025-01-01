import React,{useState,useEffect} from 'react'
import "./chatList.css"
import Adduser from './addUser/Adduser'
import {useUserStore} from "../../../lib/userStore"
import { useChatStore } from '../../../lib/chatStore'
import { onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { doc,getDoc } from 'firebase/firestore'
// import { onSnapshot } from 'firebase/firestore'
const ChatList = () => {
  const [chats,setChats] = useState([])
  const [addMode,setAddMode] = useState(false)
  const {currentUser} = useUserStore()
  const [input,setInput] = useState('')
  const {chatId,changeChat} = useChatStore()

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("Current user ID is undefined");
      return;
    }

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
      // if (doc.exists()) {
      //   setChats(doc.data() || []); // Handle missing data gracefully
      // } else {
      //   console.log("No such document!");
      // }
      const items = res.data().chats;
      const promises = items.map(async(item)=>{
        const userDocRef = doc(db,"users",item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return {...item,user}
      })
      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a,b)=> b.updateAt - a.updateAt));
      //
    });

    return () => {
      unSub();
    };
  }, [currentUser.id])
  
  // console.log("This is the chats from chats:-",chats)

  const handleSelect = async (chat) => {

    const userChats = chats.map(item => {
      const {user,...rest} = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    )

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db,"userchats",currentUser.id);

    changeChat(chat.chatId,chat.user);

    try {
      await updateDoc(userChatsRef,{
        chats:userChats,
      });

      if (!chat || !chat.chatId || !chat.user) {
        console.error("Invalid chat selected");
        return;
      }
      console.log("Selected chat:", chat);
      changeChat(chat.chatId, chat.user);
      
    } catch (error) {
      console.log(error);
    }

  };

  const filteredChats = chats.filter((c) =>
    c.user.name.toLowerCase().includes(input.toLowerCase())
  );
  

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <img
        onClick={() => setAddMode((prev) => !prev)}
        src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add' />
      </div>
      {filteredChats.map((chat, index) => (
  <div key={`${chat.chatId}-${index}`} 
  onClick={()=>handleSelect(chat)}
  className="item"
   style={{
    backgroundColor:chat?.isSeen ? "transparent":"#5183fe"
    }}>
    <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png":chat.user.avatarUrl || "./avatar.png"} alt="Avatar" />
    <div className="texts">
      <span>{chat.user.blocked.includes(currentUser.id) ? "User":chat.user.name}</span>
      <p>{chat.lastMessage || "No message yet"}</p>
    </div>
  </div>
))}




     {addMode && <Adduser/>}
    </div>
  )
}

export default ChatList
