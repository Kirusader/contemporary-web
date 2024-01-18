/** @format */

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Sidebar from "../chatcomponents/Sidebar";
import Chat from "../chatcomponents/Chat";
import "../chat.css";
import { db } from "../firebaseconfig.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
function ChatApp() {
  const [messages, setMessages] = useState([]);
  const messageCollectionRef = collection(db, "chats");
  useEffect(() => {
    const getMessages = async () => {
      const q = query(messageCollectionRef, orderBy("timestamp", "asc"));
      const data = await getDocs(q);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMessages();
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default ChatApp;
