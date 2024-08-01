import React from "react";
import "./Home.css";
import Sidebar from "../../Component/Sidebar/Sidebar";

const Home = ({ sidebar }) => {
  return (
    <>
      <Sidebar sidebar={sidebar} />
    </>
  );
};

export default Home;
