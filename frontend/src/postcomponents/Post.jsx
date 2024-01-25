/** @format */

import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import styled from "styled-components";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import IconButton from "@mui/material/IconButton";
import NearMeIcon from "@mui/icons-material/NearMe";
const Post = ({ profilePic, message, timestamp, image, username, likes }) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  const [post, setPost] = useState({
    likes: 0,
    comments: [],
    shares: 0,
  });
  const [comment, setComment] = useState(""); // new state to handle comment input
  const [showInput, setShowInput] = useState(false); // new state to handle showing and hiding of input
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  const handleComment = (e) => {
    e.preventDefault();
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, comment],
    }));
    setComment(""); // reset comment input after submitting
    setShowInput(false); // hide input after submitting
  };

  const handleShare = () => {
    setPost((prevPost) => ({
      ...prevPost,
      shares: prevPost.shares + 1,
    }));
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <PostWrapper>
      <PostTop>
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>
            {" "}
            <i style={{ color: "blueviolet" }}>Posted by, </i> <b>{username}</b>
          </h3>
          <p>{formattedDate}</p>
        </div>
      </PostTop>
      <PostBottom>
        <p>{message}</p>
      </PostBottom>
      {image ? (
        <div className="post__image">
          <img src={image} alt="Posts" />
        </div>
      ) : (
        console.log("DEBUG >>> no image here")
      )}
      <PostOptions>
        <div className="post__option">
          <IconButton onClick={handleLike}>
            {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
            {likeCount}
          </IconButton>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineIcon onClick={() => setShowInput(true)} />
          <p>{post.comments.length} Comments</p>
          {showInput && (
            <form onSubmit={handleComment}>
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleChange}
              />
              <button type="submit">Post comment</button>
            </form>
          )}
        </div>
        <div className="post__option">
          <NearMeIcon onClick={handleShare} />
          <p>{post.shares} Shares</p>
        </div>
      </PostOptions>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  .post__image {
    img {
      width: 100%;
    }
  }
`;
const PostTop = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px;
  .post__avatar {
    margin-right: 10px;
  }
  .post__topInfo {
    h3 {
      font-size: medium;
    }
    p {
      font-size: small;
      color: gray;
    }
  }
`;
const PostBottom = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px 25px;
`;
const PostOptions = styled.div`
  padding: 10px;
  border-top: 1px solid lightgray;
  display: flex;
  justify-content: space-evenly;
  font-size: medium;
  color: gray;
  cursor: pointer;
  padding: 15px;
  .post__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    flex: 1;
    p {
      margin-left: 10px;
    }
    &:hover {
      background-color: #eff2f5;
      border-radius: 10px;
    }
  }
`;
export default Post;
