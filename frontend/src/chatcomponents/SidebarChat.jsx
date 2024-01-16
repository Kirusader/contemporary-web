/** @format */
import avatarImage from "../assets/avator_profile.jpeg";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
const SidebarChat = () => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="sidebarChat">
      <Avatar src={avatarImage} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  );
};
export default SidebarChat;
