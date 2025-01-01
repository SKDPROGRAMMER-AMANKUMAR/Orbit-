import React from "react";
import "./detail.css";
import { LogOut } from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

import { updateDoc, doc, arrayRemove , arrayUnion} from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatarUrl || "./avatar.png"} alt="" />
        <h2>{user?.name || "Jhon Doe"}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>

        <div className="photos">
          <div className="photoItem">
            <div className="photoDetail">
              <img
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
                alt=""
              />
              <span>photo_2024_2.png</span>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>

          <div className="photoItem">
            <div className="photoDetail">
              <img
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
                alt=""
              />
              <span>photo_2024_2.png</span>
              <img width="30" src="./download.png" alt="" className="icon" />
            </div>
          </div>

          <div className="photoItem">
            <div className="photoDetail">
              <img
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
                alt=""
              />
              <span>photo_2024_2.png</span>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button onClick={() => auth.signOut()} className="logout">
          {" "}
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;

// Actually everything work fine but the image stlyes not get applied to the image , let me know what i can do to resolve it  ,
