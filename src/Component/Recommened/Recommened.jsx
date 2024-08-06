import React, { useEffect, useState } from "react";
import "./Recommened.css";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommened = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const relatedvideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;
        const response = await fetch(relatedvideo_url);
        const data = await response.json();
        if (data.items) {
          setApiData(data.items);
        } else {
          console.error("No items found in the API response", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="recommened">
      {apiData.length > 0 ? (
        apiData.map((item, index) => {
          const { snippet, statistics } = item;
          return (
            <Link
              to={`/video/${snippet.categoryId}/${item.id}`}
              key={index}
              className="side-video-list"
            >
              <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
              <div className="video-info">
                <h4>{snippet.title}</h4>
                <p>{snippet.channelTitle}</p>
                <p>{value_converter(statistics.viewCount)} Views</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
};

export default Recommened;
