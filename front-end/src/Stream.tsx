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
  const [renderBlock, setRenderBlock] = useState([]); // data is render in block of 3

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  var renderNextBlock = (entries) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const newBlockSize = renderBlock.length + 3;
        setRenderBlock(dataStream.slice(0, newBlockSize));
      }
    });
  };

  var observer = new IntersectionObserver(renderNextBlock, options);

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
      if (dataStream.length > 3) setRenderBlock(dataStream.slice(0, 3));
      setDataStream(dataStream);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (renderBlock.length >= 3) {
      const blockSize = renderBlock.length;
      const observeID = blockSize - 3;
      const observedElement = document.getElementById(`${observeID}`);
      observer.observe(observedElement);
    }
  }, [renderBlock]);

  return (
    <>
      {renderBlock.map((stream, index) => {
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
