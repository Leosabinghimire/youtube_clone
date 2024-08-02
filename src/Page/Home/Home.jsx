import React from "react";
import "./Home.css";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Feed from "../../Component/Feed/Feed";

const Home = ({ sidebar }) => {
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed />
      </div>
    </>
  );
};

export default Home;
