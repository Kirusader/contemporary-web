/** @format */

import React, { useEffect, useState } from "react";
import Story from "./Story";
import styled from "styled-components";
import { db } from "../firebaseconfig.js";
import { collection, query, onSnapshot } from "firebase/firestore";

const Stories = () => {
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
    <StoriesWrapper>
      {posts.slice(0, 4).map((post) => (
        <Story
          key={post.id}
          profileSrc={post.data.imageurl}
          title={post.data.username}
          image={post.data.imageurl}
        />
      ))}
    </StoriesWrapper>
  );
};

const StoriesWrapper = styled.div`
  display: flex;
`;

export default Stories;
