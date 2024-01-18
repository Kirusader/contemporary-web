/** @format */

import React, { useEffect, useState } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import profilePicture from "../assets/avator_profile.jpeg";
import { db } from "../firebaseconfig.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
const Sidebar = () => {
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
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={profilePicture} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat messages={messages} />
      </div>
    </div>
  );
};
export default Sidebar;
