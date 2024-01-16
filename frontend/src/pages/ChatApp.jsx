/** @format */

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Sidebar from "../chatcomponents/Sidebar";
import Chat from "../chatcomponents/Chat";
import "../chat.css";
import axios from "../chatcomponents/axios";
function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("d26dc308b340e5117a7f", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // Use functional update to ensure we always have the latest state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    // Cleanup function to unbind and unsubscribe when component unmounts or dependencies change
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []); // Removed 'messages' from the dependencies array

  console.log(messages);

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
