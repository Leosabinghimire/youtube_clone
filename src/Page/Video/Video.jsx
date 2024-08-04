import React from "react";
import "./Video.css";
import Playvideo from "../../Component/PlayVideo/Playvideo";
import Recommened from "../../Component/Recommened/Recommened";

const Video = () => {
  return (
    <div className="play-container">
      <Playvideo />
      <Recommened />
    </div>
  );
};

export default Video;
