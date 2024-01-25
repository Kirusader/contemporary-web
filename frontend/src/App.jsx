/** @format */

// App.jsx
import React from "react";
import { useAuth } from "./Reducer";
import GameApp from "./pages/GameApp";
import QuizApp from "./pages/QuizApp";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ChatApp from "./pages/ChatApp";
import Home from "./postcomponents/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Chat from "./chatcomponents/Chat";
import { Routes, Route } from "react-router-dom";
import "./chat.css";

function App() {
  const { state } = useAuth();

  return (
    <Routes>
      {state.isLoggedIn ? (
        <>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<QuizApp />} />
            <Route path="chat" element={<ChatApp />} />
            <Route path="chat/:memberId" element={<Chat />} />
            <Route path="game" element={<GameApp />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />{" "}
        </>
      )}
    </Routes>
  );
}

export default App;
