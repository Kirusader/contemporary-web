/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firebaseconfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseconfig.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = doc(db, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { email, uid } = user;
      const { username } = additionalData;

      try {
        await setDoc(userRef, {
          username,
          email,
          uid,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log("Error in creating user", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length >= 4 && username.length <= 10) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await createUserDocument(user, { username });
        navigate("/login");
      } catch (error) {
        setErrorMessage(
          <p style={{ color: "red", textAlign: "center", fontSize: "large" }}>
            You have {error.code} error!!
          </p>
        );
      }
    } else {
      setErrorMessage(
        <p style={{ color: "red", textAlign: "center", fontSize: "large" }}>
          User name should be between 4 and 10 characters!
        </p>
      );
    }
  };

  return (
    <div
      className="container"
      style={{ color: "white", fontWeight: "bolder", fontSize: "large" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>Register</h1>
      <Form onSubmit={handleSubmit}>
        {errorMessage}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            minLength="4"
            maxLength="10"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Button
          variant="primary"
          type="submit"
          style={{ margin: "3rem 3rem 3rem 0rem" }}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
