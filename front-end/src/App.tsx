// import { Card } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import Video from "./components/Video";

function App() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors" as RequestMode,
      };

      const videoRes = await fetch(
        `http://${import.meta.env.VITE_LOCAL_IPv4}:3000/videos`,
        requestOptions
      );
      const videoData = await videoRes.json();
      setVideos(videoData);

      const imageRes = await fetch(
        `http://${import.meta.env.VITE_LOCAL_IPv4}:3000/images`,
        requestOptions
      );
      const imageData = await imageRes.json();
      setImages(imageData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {videos[0] &&
        videos.map((video, index) => (
          <Video
            key={index}
            src={`${import.meta.env.VITE_VIDEO_DATA_DIR}${video}`}
          />
        ))}
      {images.map((image, index) => (
        <img
          key={index}
          src={`${import.meta.env.VITE_IMAGE_DATA_DIR}${image}`}
          className="max-w-md  mx-auto bg-zinc-800 border-0 rounded-none"
        />
      ))}
    </>
  );
}

export default App;
