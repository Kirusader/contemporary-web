/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Reducer";
import { auth } from "../firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, signInWithGoogle, signInWithFacebook } from "../firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
import { Google } from "../assets/Google.jsx";
import { Facebook } from "../assets/Facebook.jsx";
import HubLogo from "../assets/student-hub.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Login() {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      // ... (handle the signed-in user)
      if (user) {
        // Handle successful login here
        const token = user.accessToken;
        const uid = user.uid;
        const userRef = doc(db, `users/${user.uid}`);
        const snapshot = await getDoc(userRef);
        const username = snapshot.data().username;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("uid", uid);
        dispatch({ type: "LOGIN_SUCCESS", payload: { uid, token, username } });
        setisLoggedIn(true);
        // Redirect to home page
        navigate("/");
      } else {
        // Handle failed login here
        alert("User name doesn't exist please enter again!!");
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: "Invalid credentials" },
        });
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(
        <p style={{ color: "red", textAlign: "center", fontSize: "large" }}>
          You have {error.code} error!!
        </p>
      );
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleGoogleLogin = async () => {
    await signInWithGoogle(navigate, dispatch);
  };
  const handleFacebookLogin = async () => {
    await signInWithFacebook(navigate, dispatch);
  };
  return (
    <div
      className="container"
      style={{ color: "white", fontWeight: "bolder", fontSize: "large" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "5px",
        }}>
        {" "}
        <img
          src={HubLogo}
          alt="Student Hub Logo"
          style={{ width: "100px", height: "100px", marginLeft: "20px" }}
        />
        <h1 style={{ textAlign: "center", color: "white" }}>
          Welcome Solent Student Hub
        </h1>
      </div>
      <h1 style={{ textAlign: "center", color: "white" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        {errorMessage}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}>
            <Form.Control
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <IconButton
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                margin: "0 10px",
              }}>
              {isPasswordVisible ? (
                <VisibilityOffIcon color="primary" />
              ) : (
                <VisibilityIcon color="primary" />
              )}
            </IconButton>
          </div>
        </Form.Group>
        <Form.Group style={{ alignItems: "baseline" }}>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "1rem 3rem 0rem 0rem " }}>
            Login
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
            }}>
            <hr
              style={{
                width: "45%",
                margin: 0,
                borderWidth: "2px",
                borderColor: "white",
              }}
            />
            <p style={{ margin: "0 10px", color: "white" }}>OR</p>
            <hr
              style={{
                width: "45%",
                margin: 0,
                borderWidth: "2px",
                borderColor: "white",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "4px",
            }}>
            <button
              onClick={() => handleGoogleLogin()}
              style={{
                backgroundColor: "#002ead",
                color: "white",
                padding: "5px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "2px",
              }}>
              <Google style={{ marginRight: "8px" }} />
              <p style={{ margin: 0 }}>Sign in with Google</p>
            </button>
            <button
              onClick={() => handleFacebookLogin()}
              style={{
                backgroundColor: "#4267B2",
                color: "white",
                padding: "5px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Facebook style={{ marginRight: "8px" }} />
              <p style={{ margin: 0 }}>Sign in with Facebook</p>{" "}
            </button>
          </div>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
