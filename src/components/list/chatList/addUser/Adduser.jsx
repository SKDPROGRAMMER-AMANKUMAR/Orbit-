import React, { useState } from "react";
import "./adduser.css";
import { db } from "../../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  const navigate  = useNavigate();
 const [user,setUser] = useState(null);

 const {currentUser} = useUserStore();
  const handleSearch = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    try {

      const userRef = collection(db, "users");
      const q = query(userRef,where("name","==",name))

      const querySnapShot = await getDocs(q);

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }

    } catch (error) {
      console.log(error)
    }
  }

  // console.log("The data from Adduser file is:-",user)

  // const handleAdd = async () => {
  //   const chatId =
  //       currentUser.id > user.id
  //         ? `${currentUser.id}_${user.id}`
  //         : `${user.id}_${currentUser.id}`;
  //     const chatRef = doc(db, "chats", chatId);

  //     // Check if chat already exists
  //     const chatSnap = await getDoc(chatRef);
  //     if (!chatSnap.exists()) {
  //       await setDoc(chatRef, {
  //         createdAt: serverTimestamp(),
  //         messages: [],
  //       });
  //     }

  //   const userChatsRef = collection(db, "userchats");
  //   try {
  //     // Create a new document reference inside the "chats" collection
  //     const newChatRef = doc(chatRef); 
  
  //     // Use setDoc with the new document reference
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: []
  //     });

  //     // Check if the userChats document for the current user exists, if not create it
  //   // const currentUserChatsDocRef = doc(userChatsRef, currentUser.id);
  //   // const currentUserDoc = await getDocs(currentUserChatsDocRef);
  //   // if (!currentUserDoc.exists()) {
  //   //   await setDoc(currentUserChatsDocRef, { chats: [] });  // Create the document if it doesn't exist
  //   // }

  //   // // Check if the userChats document for the target user exists, if not create it
  //   // const targetUserChatsDocRef = doc(userChatsRef, user.id);
  //   // const targetUserDoc = await getDocs(targetUserChatsDocRef);
  //   // if (!targetUserDoc.exists()) {
  //   //   await setDoc(targetUserChatsDocRef, { chats: [] });  // Create the document if it doesn't exist
  //   // }

  //     await updateDoc(doc(userChatsRef,user.id),{
  //       chats:arrayUnion({
  //         chatId:newChatRef.id,
  //         lastMessage:"",
  //         receiverId:currentUser.id,
  //         updatedAt:Date.now(),
  //       }),
  //     });

  //     await updateDoc(doc(userChatsRef,currentUser.id),{
  //       chats:arrayUnion({
  //         chatId:newChatRef.id,
  //         lastMessage:"",
  //         receiverId:user.id,
  //         updatedAt:Date.now(),
  //       }),
  //     });
  
  //     console.log('The new chat ID is:', newChatRef.id);
  //   } catch (error) {
  //     console.error("Error adding document: ", error.message);
  //   }
  // };

  // const handleAdd = async () => {
  //   try {
  //     const chatId =
  //       currentUser.id > user.id
  //         ? `${currentUser.id}_${user.id}`
  //         : `${user.id}_${currentUser.id}`;
  //     const chatRef = doc(db, "chats", chatId);

  //     // Check if chat already exists
  //     const chatSnap = await getDoc(chatRef);
  //     if (!chatSnap.exists()) {
  //       await setDoc(chatRef, {
  //         createdAt: serverTimestamp(),
  //         messages: [],
  //       });
  //     }

  //     // Update userChats for both users
  //     const userChatsRef = collection(db, "userchats");
  //     await setDoc(
  //       doc(userChatsRef, user.id),
  //       {
  //         chats: arrayUnion({
  //           chatId,
  //           lastMessage: "",
  //           receiverId: currentUser.id,
  //           updatedAt: serverTimestamp(),
  //         }),
  //       },
  //       { merge: true }
  //     );

  //     await setDoc(
  //       doc(userChatsRef, currentUser.id),
  //       {
  //         chats: arrayUnion({
  //           chatId,
  //           lastMessage: "",
  //           receiverId: user.id,
  //           updatedAt: serverTimestamp(),
  //         }),
  //       },
  //       { merge: true }
  //     );

  //     console.log("New chat created with ID:", chatId);
  //   } catch (error) {
  //     alert("Error adding user. Please try again.");
  //     console.error("Error adding user:", error.message);
  //   }
  // };
  
  // const handleAdd = async () => {
  //   try {
  //     const chatId =
  //       currentUser.id > user.id
  //         ? `${currentUser.id}_${user.id}`
  //         : `${user.id}_${currentUser.id}`;
  //     const chatRef = doc(db, "chats", chatId);
  
  //     // Check if chat already exists
  //     const chatSnap = await getDoc(chatRef);
  //     if (!chatSnap.exists()) {
  //       await setDoc(chatRef, {
  //         createdAt: serverTimestamp(),
  //         messages: [],
  //       });
  //     }
  
  //     // Update userChats for both users
  //     const userChatsRef = collection(db, "userchats");
  
  //     // Add chat to current user's chats with a timestamp field added separately
  //     await setDoc(
  //       doc(userChatsRef, user.id),
  //       {
  //         chats: arrayUnion({
  //           chatId,
  //           lastMessage: "",
  //           receiverId: currentUser.id,
  //           updatedAt: serverTimestamp(),  // Now, timestamp is placed correctly here
  //         }),
  //       },
  //       { merge: true }
  //     );
  
  //     // Add chat to the other user's chats with a timestamp field
  //     await setDoc(
  //       doc(userChatsRef, currentUser.id),
  //       {
  //         chats: arrayUnion({
  //           chatId,
  //           lastMessage: "",
  //           receiverId: user.id,
  //           updatedAt: serverTimestamp(),
  //         }),
  //       },
  //       { merge: true }
  //     );
  
  //     console.log("New chat created with ID:", chatId);
  //   } catch (error) {
  //     alert("Error adding user. Please try again.");
  //     console.error("Error adding user:", error.message);
  //   }
  // };
  
  const handleAdd = async () => {
    try {
      const chatId =
        currentUser.id > user.id
          ? `${currentUser.id}_${user.id}`
          : `${user.id}_${currentUser.id}`;
      const chatRef = doc(db, "chats", chatId);
  
      // Check if chat already exists
      const chatSnap = await getDoc(chatRef);
      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          createdAt: serverTimestamp(),
          messages: [],
        });
      }
  
      // Update userChats for both users (without the serverTimestamp)
      const userChatsRef = collection(db, "userchats");
  
      // Add chat to current user's chats
      await setDoc(
        doc(userChatsRef, user.id),
        {
          chats: arrayUnion({
            chatId,
            lastMessage: "",
            receiverId: currentUser.id,
          }),
        },
        { merge: true }
      );
  
      // Add chat to the other user's chats
      await setDoc(
        doc(userChatsRef, currentUser.id),
        {
          chats: arrayUnion({
            chatId,
            lastMessage: "",
            receiverId: user.id,
          }),
        },
        { merge: true }
      );
  
      // Now update the updatedAt field with serverTimestamp separately
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId,
          updatedAt: serverTimestamp(), // Add timestamp in a separate update
        }),
      });
  
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId,
          updatedAt: serverTimestamp(), // Add timestamp in a separate update
        }),
      });
  
      console.log("New chat created with ID:", chatId);
    } catch (error) {
      alert("Error adding user. Please try again.");
      console.error("Error adding user:", error.message);
    }
  };
  

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
       <input type="text" placeholder='Username' name='name' />
       <button>Search</button>
      </form>
     { user && <div className="user">
        <div className="detailView">
            <img src={user.avatarUrl || "./avatar.png"} alt="" />
            <span>{user.name}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default Adduser