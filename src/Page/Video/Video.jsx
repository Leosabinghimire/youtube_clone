import React from "react";
import "./Video.css";
import Playvideo from "../../Component/PlayVideo/Playvideo";
import Recommened from "../../Component/Recommened/Recommened";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <Playvideo videoId={videoId} />
      <Recommened categoryId={categoryId} />
    </div>
  );
};

export default Video;
