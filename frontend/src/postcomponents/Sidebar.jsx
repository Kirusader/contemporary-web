/** @format */

import React, { useEffect, useState } from "react";
import SidebarRow from "./SidebarRow";
import FeedIcon from "@mui/icons-material/Feed";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GamepadIcon from "@mui/icons-material/Gamepad";
import styled from "styled-components";
import { useAuth } from "../Reducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      dispatch({
        type: "LOGIN",
        payload: { username: storedUsername, isLoggedIn: true },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (logout) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("username");
      navigate("/login");
      setLogout(false); // reset the state after logout
    }
  }, [logout, dispatch, navigate]);

  const handleHome = () => {
    navigate("/");
  };
  const handleChat = () => {
    navigate("/chat");
  };
  const handleQuiz = () => {
    navigate("/quiz");
  };
  const handleGame = () => {
    navigate("/game");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    setLogout(true);
  };
  return (
    <SidebarWrapper
      style={{ color: "white", fontWeight: "bolder", fontSize: "larger" }}>
      <SidebarRow title={`Welcome, ${username}`} />

      <SidebarRow onClick={handleHome} Icon={FeedIcon} title="Home" />
      <SidebarRow onClick={handleChat} Icon={ContactMailIcon} title="Chat" />
      <SidebarRow onClick={handleQuiz} Icon={LiveHelpIcon} title="Quiz" />
      <SidebarRow onClick={handleGame} Icon={GamepadIcon} title="Game" />
      {state.isLoggedIn ? (
        <SidebarRow onClick={handleLogout} Icon={LogoutIcon} title="Logout" />
      ) : (
        <SidebarRow onClick={handleLogin} Icon={LoginIcon} title="Login" />
      )}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  position: static;
  top: 0;
  left: 0;
`;

export default Sidebar;
