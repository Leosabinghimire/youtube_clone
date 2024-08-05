import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import { formatDate } from "../../data";

const Playvideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChanneldata] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(videoDetails_url);
    const data = await response.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    const channeldata_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

    const response = await fetch(channeldata_url);
    const data = await response.json();
    setChanneldata(data.items[0]);
  };

  const fetchComments = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    const response = await fetch(comment_url);
    const data = await response.json();
    setCommentData(data.items);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData(apiData.snippet.channelId);
      fetchComments();
    }
  }, [apiData]);

  if (!apiData) return <div>No video data available</div>;
  if (!channelData) return <div>Loading channel data...</div>;

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={apiData.snippet.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData.statistics.viewCount)} Views &bull;{" "}
          {formatDate(apiData.snippet.publishedAt)}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
            {value_converter(apiData.statistics.dislikeCount || 0)}
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
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt="jack"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}
            Subscribers
          </span>
        </div>
        <button>Subscribers</button>
      </div>
      <div className="video-description">
        <p>{apiData.snippet.description.slice(0, 250)}</p>
        <hr />
        <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>

        {commentData.map((item, index) => {
          const topLevelComment = item.snippet.topLevelComment;
          return topLevelComment ? (
            <div key={index} className="comment">
              <img
                src={topLevelComment.snippet.authorProfileImageUrl}
                alt="userprofile"
              />
              <div>
                <h3>
                  {topLevelComment.snippet.authorDisplayName}
                  <span>{formatDate(topLevelComment.snippet.publishedAt)}</span>
                </h3>
                <p>{topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="like" />
                  <span>
                    {value_converter(topLevelComment.snippet.likeCount)}
                  </span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Playvideo;
