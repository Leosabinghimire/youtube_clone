import React from "react";
import "./Playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";

const Playvideo = () => {
  return (
    <div className="play-video">
      <video src={video1} controls autoPlay muted></video>
      <h3>Best YouTube Channel To Learn Web Development</h3>
      <div className="play-video-info">
        <p>1525 Views &bull; 2 days ago</p>
        <div>
          <span>
            <img src={like} alt="" />
            125
          </span>
          <span>
            <img src={dislike} alt="" />0
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="jack" />
        <div>
          <p>MrBeast</p>
          <span>25M Subscribers</span>
        </div>
        <button>Subscribers</button>
      </div>
      <div className="video-description">
        <p>Channel that make learning Easy</p>
        <p>Subscribe MrBeast to watch more Tutorials on web development</p>
        <hr />
        <h4>1k Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="userprofile" />
          <div>
            <h3>
              Jimmy <span>1 day ago</span>
            </h3>
            <p>
              A computer is an electronic device that manipulates information or
              data. It has the ability to store, retrieve, and process data.
              Computers can be used to type documents, send email, play games,
              browse the web, and more. They are also used to handle complex
              calculations, control machinery, and process large amounts of
              information quickly
            </p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="userprofile" />
          <div>
            <h3>
              Jimmy <span>1 day ago</span>
            </h3>
            <p>
              A computer is an electronic device that manipulates information or
              data. It has the ability to store, retrieve, and process data.
              Computers can be used to type documents, send email, play games,
              browse the web, and more. They are also used to handle complex
              calculations, control machinery, and process large amounts of
              information quickly
            </p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="userprofile" />
          <div>
            <h3>
              Jimmy <span>1 day ago</span>
            </h3>
            <p>
              A computer is an electronic device that manipulates information or
              data. It has the ability to store, retrieve, and process data.
              Computers can be used to type documents, send email, play games,
              browse the web, and more. They are also used to handle complex
              calculations, control machinery, and process large amounts of
              information quickly
            </p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="userprofile" />
          <div>
            <h3>
              Jimmy <span>1 day ago</span>
            </h3>
            <p>
              A computer is an electronic device that manipulates information or
              data. It has the ability to store, retrieve, and process data.
              Computers can be used to type documents, send email, play games,
              browse the web, and more. They are also used to handle complex
              calculations, control machinery, and process large amounts of
              information quickly
            </p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="userprofile" />
          <div>
            <h3>
              Jimmy <span>1 day ago</span>
            </h3>
            <p>
              A computer is an electronic device that manipulates information or
              data. It has the ability to store, retrieve, and process data.
              Computers can be used to type documents, send email, play games,
              browse the web, and more. They are also used to handle complex
              calculations, control machinery, and process large amounts of
              information quickly
            </p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playvideo;
