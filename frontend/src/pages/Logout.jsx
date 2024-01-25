/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Reducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    navigate("/login");
  }, []);

  return (
    <div
      style={{ textAlign: "center", fontWeight: "bolder", fontSize: "large" }}>
      Logging out...
    </div>
  );
};

export default Logout;
