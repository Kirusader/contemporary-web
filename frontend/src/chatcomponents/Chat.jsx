/** @format */

import React, { useEffect, useState } from "react";
import {
  AttachFile,
  MoreVert,
  Search,
  InsertEmoticon,
} from "@mui/icons-material";
import avatarImage from "../assets/avator_profile.jpeg";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MicIcon from "@mui/icons-material/Mic";
import { db } from "../firebaseconfig.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const Chat = ({ messages }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const messageCollectionRef = collection(db, "chats");
  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(messageCollectionRef, {
      message: input,
      name: "Kiros",
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInput("");
    window.location.reload();
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={avatarImage} />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => {
          return (
            <p
              key={index}
              className={`chat__message ${
                message.received && "chat__receiver"
              }`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};
export default Chat;
