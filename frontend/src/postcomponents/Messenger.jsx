/** @format */

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import styled from "styled-components";
import { useAuth } from "../Reducer";
import { storage, db } from "../firebaseconfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

const Messenger = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "Dave",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { state, dispatch } = useAuth();
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "posts"), {
        ...formData,
        imageurl: url,
        timestamp: new Date(),
      });

      // Reset form
      setFormData({
        username: "",
        description: "",
        // reset other fields
      });
      setImage(null);
    }
  };
  return (
    <MessengerWrapper>
      <MessengerTop>
        <Avatar />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleImageChange} />
          <input
            hidden
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="what is in your mind?"
          />
          {/* other input fields */}
          <button type="submit">Submit</button>
        </form>
      </MessengerTop>
      <MessengerBottom>
        <div className="messenger__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messenger__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messenger__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </MessengerBottom>
    </MessengerWrapper>
  );
};
const MessengerWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  width: 100%;
`;
const MessengerTop = styled.div`
  display: flex;
  border-bottom: 1px solid #eff2f5;
  padding: 15px;
  form {
    flex: 1;
    display: flex;
    .messenger__input {
      flex: 1;
      outline-width: 0;
      border: none;
      padding: 5px 20px;
      margin: 0 10px;
      border-radius: 999px;
      background-color: #eff2f5;
    }
    .messenger__fileSelector {
      width: 20%;
    }
    button {
      background-color: #0077ff;
      border: none;
      border-radius: 33px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      padding: 10px 20px;
      cursor: pointer;
      z-index: 1;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #0066cc;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    }
  }
`;
const MessengerBottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  .messenger__option {
    padding: 20px;
    display: flex;
    align-items: center;
    color: gray;
    margin: 5px;
    h3 {
      font-size: medium;
      margin-left: 10px;
    }
    &:hover {
      background-color: #eff2f5;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`;
export default Messenger;