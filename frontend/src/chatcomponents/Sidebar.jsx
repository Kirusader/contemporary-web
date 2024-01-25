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
import { collection, query, onSnapshot, where } from "firebase/firestore";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    const q = query(usersCollectionRef, where("uid", "!=", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(loadedUsers);
    });

    return () => unsubscribe();
  }, [userId]);

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
        {users.map((user) => (
          <SidebarChat key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
