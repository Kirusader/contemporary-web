/** @format */

import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
const Home = () => {
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ position: "sticky", left: "0" }}>
        <Sidebar />
      </div>
      <Feed />
    </div>
  );
};

export default Home;
