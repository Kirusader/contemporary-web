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
import SendIcon from "@mui/icons-material/Send";
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
  onSnapshot,
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
  }, [dispatch, storedUid, storedUsername]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const q = query(
          collection(db, "users"),
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
  useEffect(() => {
    const subscribeToMessages = (chatIdentifier, setMessageState) => {
      const q = query(
        messageCollectionRef,
        where("chatId", "==", chatIdentifier),
        orderBy("timestamp", "asc")
      );

      // Using onSnapshot to listen to real-time updates on chat messages
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessageState(messages);
      });

      return unsubscribe;
    };

    // Subscribe to messages for storedChatId and invertedChatId
    const unsubscribeStoredChat = subscribeToMessages(
      storedChatId,
      setMessages
    );
    const unsubscribeInvertedChat = subscribeToMessages(
      invertedChatId,
      setMyMessages
    );

    // Cleanup process to unsubscribe from the listeners when the component unmounts
    return () => {
      unsubscribeStoredChat();
      unsubscribeInvertedChat();
    };
  }, [storedChatId, invertedChatId]);

  // useEffect(() => {
  //   const getMessages = async (chatIdentifier, setMessageState) => {
  //     const q = query(
  //       messageCollectionRef,
  //       where("chatId", "==", chatIdentifier),
  //       orderBy("timestamp", "asc")
  //     );
  //     const data = await getDocs(q);
  //     setMessageState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getMessages(storedChatId, setMessages);
  //   getMessages(invertedChatId, setMyMessages);
  // }, [storedChatId, invertedChatId]);

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
              {chatWith.length > 0 &&
                chatWith
                  .slice(0, 1)
                  .map((chat) => (
                    <h3 key={chat.id}>You are chatting with {chat.username}</h3>
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
            {(myMessages.length || messages.length) <= 0 ? (
              <p
                style={{
                  color: "black",
                  backgroundColor: "white",
                  textAlign: "center",
                }}>
                You haven't chat with before start chat now by sending messages.
              </p>
            ) : (
              <div className="chat__messageContainer">
                {combinedMessages.map((message) => {
                  const isChatWithName =
                    chatWith.length > 0 &&
                    message.name === chatWith[0].username;
                  return (
                    <p
                      key={message.id}
                      className={`chat__message ${
                        !isChatWithName && message.received
                          ? "chat__receiver"
                          : ""
                      }`}>
                      <span className="chat__name">{message.name}</span>
                      {message.message}
                      <span className="chat__timestamp">
                        {message.timestamp}
                      </span>
                    </p>
                  );
                })}
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
              <IconButton type="submit" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </form>
            <MicIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
