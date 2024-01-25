/** @format */

import React, { useEffect, useState } from "react";
import { useAuth } from "../Reducer.jsx";
import { useParams } from "react-router-dom";
import {
  AttachFile,
  MoreVert,
  Search,
  InsertEmoticon,
} from "@mui/icons-material";
import Sidebar from "./Sidebar.jsx";
import avatarImage from "../assets/avator_profile.jpeg";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MicIcon from "@mui/icons-material/Mic";
import { db } from "../firebaseconfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
const Chat = () => {
  const { dispatch } = useAuth();
  const [messages, setMessages] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [chatId, setChatId] = useState("");
  const messageCollectionRef = collection(db, "chats");
  const myparams = useParams();
  const storedUid = localStorage.getItem("uid");
  const storedUsername = localStorage.getItem("username");
  const storedChatId = storedUid + myparams.memberId;
  const invertedChatId = myparams.memberId + storedUid;
  const [chatWith, setChatWith] = useState([]);
  useEffect(() => {
    if (storedUsername && storedUid) {
      setUid(storedUid);
      setUsername(storedUsername);
      setChatId(storedChatId);
      dispatch({
        type: "LOGIN",
        payload: { username: storedUsername, uid: storedUid, isLoggedIn: true },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const q = query(
          messageCollectionRef,
          where("uid", "==", myparams.memberId)
        );
        const data = await getDocs(q);
        setChatWith(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (myparams.memberId) {
      getChats();
    }
  }, [myparams.memberId]);
  console.log(chatWith[0]);
  useEffect(() => {
    const getMessages = async (chatIdentifier, setMessageState) => {
      const q = query(
        messageCollectionRef,
        where("chatId", "==", chatIdentifier),
        orderBy("timestamp", "asc")
      );
      const data = await getDocs(q);
      setMessageState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMessages(storedChatId, setMessages);
    getMessages(invertedChatId, setMyMessages);
  }, [storedChatId, invertedChatId]);
  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(messageCollectionRef, {
      chatId: chatId,
      message: input,
      name: username,
      uid: uid,
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInput("");
    window.location.reload();
  };
  const combinedMessages = [...myMessages, ...messages].sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="chat">
          <div className="chat__header">
            <Avatar src={avatarImage} />
            <div className="chat__headerInfo">
              {chatWith.slice(0, 1).map((chat) => (
                <h3 key={chat.id}>You are chatting with {chat.name}</h3>
              ))}
              <p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
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
            {}
            {(myMessages.length || messages.length) <= 0 ? (
              <p
                style={{
                  color: "black",
                  backgroundColor: "white",
                  textAlign: "center",
                }}>
                {" "}
                You haven't chat with before start chat now by sending messages.
              </p>
            ) : (
              <div className="chat__messageContainer">
                {combinedMessages.map((message) =>
                  message.name === chatWith[0].name ? (
                    <p className="chat__message" key={message.id}>
                      <span className="chat__name">{message.name}</span>
                      {message.message}
                      <span className="chat__timestamp">
                        {message.timestamp}
                      </span>
                    </p>
                  ) : (
                    <p
                      key={message.id}
                      className={`chat__message ${
                        message.received && "chat__receiver"
                      }`}>
                      <span className="chat__name">{message.name}</span>
                      {message.message}
                      <span className="chat__timestamp">
                        {message.timestamp}
                      </span>
                    </p>
                  )
                )}
              </div>
            )}
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
      </div>
    </div>
  );
};
export default Chat;
