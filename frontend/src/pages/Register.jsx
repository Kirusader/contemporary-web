/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firebaseconfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseconfig.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import HubLogo from "../assets/student-hub.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

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

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordValidations({
      minLength: value.length >= 6,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[\W_]/.test(value),
    });
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
        alert("You registered successfully!!");
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
      <Form onSubmit={handleSubmit}>
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
            Solent Student Hub
          </h1>
        </div>
        <h1 style={{ textAlign: "center", color: "white" }}>Register</h1>
        <div>
          {errorMessage}
          <p style={{ color: passwordValidations.minLength ? "green" : "red" }}>
            Password must be minimum 8 characters
          </p>
          <p style={{ color: passwordValidations.lowercase ? "green" : "red" }}>
            At least one lowercase letter
          </p>
          <p style={{ color: passwordValidations.uppercase ? "green" : "red" }}>
            At least one uppercase letter
          </p>
          <p style={{ color: passwordValidations.number ? "green" : "red" }}>
            At least one number
          </p>
          <p
            style={{
              color: passwordValidations.specialChar ? "green" : "red",
            }}>
            At least one special character
          </p>
        </div>

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

        <Form.Group
          controlId="formBasicPassword"
          style={{ position: "relative" }}>
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
              onChange={handlePasswordChange}
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
