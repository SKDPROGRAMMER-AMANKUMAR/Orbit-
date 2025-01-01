import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import {
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { storage } from "../../lib/Appwriteconfig";
import { toast } from 'react-toastify'
import { ID } from 'appwrite'
const Chat = () => {
  const [chat, setChat] = useState();
  const [emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const endRef = useRef(null);

  const { chatId, user , isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!chatId) {
      console.warn("No chatId available");
      return;
    }
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (!doc.exists()) {
        console.warn("Chat does not exist for chatId:", chatId);
        setChat(null); // Handle empty chat
      } else {
        setChat(doc.data());
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log("The chat from Chat.jsx file is:-", chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setEmoji(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = "";
    try {
      if (img.file) {
        const file = img.file;

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
          imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${
            import.meta.env.VITE_APPWRITE_BUCKET_ID
          }/files/${fileId}/view?project=${
            import.meta.env.VITE_APPWRITE_PROJECT_ID
          }`;
        } else {
          throw new Error("Failed to upload file: No file ID returned.");
        }
      }
    } catch (uploadError) {
      console.error("File upload failed:", uploadError);
      toast.error(
        `Failed to upload avatar: ${uploadError.message || uploadError}`
      );
    }

    try {
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl}),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatarUrl || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.name || "User"}</span>
            <p>{user?.status || "No status available"}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>
      <div className="center">
        {chat?.message?.map((message) => (
          <div className={message.senderId === currentUser?.id ? "message own":"message"}>
            <div key={message?.createdAt} className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}

        {img.url && <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
          </div>}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="img" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="camera" />
          <img src="./mic.png" alt="mic" />
        </div>
        <input
          value={text}
          type="text"
          placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send message":"Message"}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setEmoji((prev) => !prev)}
          />
          <div className="picker">
            {emoji && <EmojiPicker onEmojiClick={handleEmoji} />}
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
