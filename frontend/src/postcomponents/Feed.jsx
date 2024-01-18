/** @format */

import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import styled from "styled-components";
import Messenger from "./Messenger";
import Post from "./Post.jsx";
import { db } from "../firebaseconfig.js";
import { collection, query, onSnapshot } from "firebase/firestore";
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FeedWrapper>
      <Stories />
      <Messenger />
      {posts.map((post) => (
        <Post
          key={post.id}
          profilePic={post.data.imageurl}
          message={post.data.description}
          image={post.data.imageurl}
          timestamp={post.data.timestamp.toDate().toLocaleString()}
          username={post.data.username}
        />
      ))}
    </FeedWrapper>
  );
};
const FeedWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Feed;
