/** @format */

import avatarImage from "../assets/avator_profile.jpeg";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
const SidebarChat = ({ user }) => {
  return (
    <div className="sidebarChat">
      <div className="sidebarChat__info">
        <IconButton onClick={() => window.location.reload()}>
          <NavLink
            to={`/chat/${user.uid}`}
            className="sidebarChat__link"
            style={({ isActive }) => ({
              color: isActive ? "black" : "",
              display: "flex",
              padding: "2px",
              textDecoration: "none",
              backgroundColor: isActive ? "blueviolet" : "white",
            })}
            end>
            <Avatar src={avatarImage} />
            <h5 style={{ padding: "0px 20px 0px 20px" }}>{user.username}</h5>
          </NavLink>
        </IconButton>
      </div>
    </div>
  );
};

export default SidebarChat;
