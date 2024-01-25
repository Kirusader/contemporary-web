/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Reducer";
import { auth } from "../firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
function Login() {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <div
      className="container"
      style={{ color: "white", fontWeight: "bolder", fontSize: "large" }}>
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
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ alignItems: "baseline" }}>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "1rem 3rem 0rem 0rem " }}>
            Login
          </Button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
