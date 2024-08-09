import React, { useState, useEffect } from "react";
import Video from "./components/Video";
import Image from "./components/Image";

interface DataObject {
  video?: string;
  image?: string;
  short?: string;
}

function App() {
  const [dataStream, setDataStream] = useState([]); // Entire data stream payload
  const fetchData = async () => {
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors" as RequestMode,
      };

      const res = await fetch(
        `http://${import.meta.env.VITE_LOCAL_IPv4}:3000/stream`,
        requestOptions
      );
      const dataStream: DataObject[] = await res.json();
      setDataStream(dataStream);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {dataStream.map((stream, index) => {
        if (stream.hasOwnProperty("image")) {
          return <Image id={index} src={stream.image} />;
        } else if (stream.hasOwnProperty("video")) {
          return (
            <Video
              id={index}
              src={`${import.meta.env.VITE_VIDEO_DATA_DIR}${stream.video}`}
            />
          );
        } else if (stream.hasOwnProperty("short")) {
          return (
            <Video
              id={index}
              src={`${import.meta.env.VITE_SHORT_DATA_DIR}${stream.short}`}
            />
          );
        }
      })}
    </>
  );
}

export default App;
