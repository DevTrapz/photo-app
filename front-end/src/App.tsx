import React, { useState, useEffect } from "react";
import Video from "./components/Video";
import Image from "./components/Image";
import { useCookies } from "react-cookie";
interface MediaType {
  video?: string;
  image?: string;
  short?: string;
}

function App() {
  const [dataStream, setDataStream] = useState([]); // Entire data stream payload
  const [preferredStream, setPreferred] = useState([]);
  const [renderBlock, setRenderBlock] = useState([]); // data is render in block of 3
  const [cookies] = useCookies(["preferences"]);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  function filterMediaPreferences() {
    const preferences = cookies.preferences["display-options"];
    const newStream = dataStream.filter((media) =>
      preferences.some((mediaType) => mediaType in media)
    );

    setPreferred(newStream);
  }

  var renderNextBlock = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const newBlockSize = renderBlock.length + 3;
        setRenderBlock(preferredStream.slice(0, newBlockSize));
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
      const dataStream: MediaType[] = await res.json();
      setDataStream(dataStream);
    } catch (err) {
      console.log(err);
    }
  };

  function initializeRenderBlock() {
    preferredStream.length > 3
      ? setRenderBlock(preferredStream.slice(0, 3))
      : setRenderBlock(preferredStream);
  }

  function observeNextRenderBlock() {
    if (renderBlock.length >= 3) {
      const blockSize = renderBlock.length;
      const observeID = blockSize - 3;
      const observedElement = document.getElementById(`${observeID}`);
      observer.observe(observedElement);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterMediaPreferences();
  }, [dataStream]);

  useEffect(() => {
    initializeRenderBlock();
  }, [preferredStream]);

  useEffect(() => {
    setRenderBlock([]);
    filterMediaPreferences();
  }, [cookies.preferences]);

  useEffect(() => {
    observeNextRenderBlock();
  }, [renderBlock]);

  return (
    <>
      {renderBlock.map((stream, index) => {
        if ("image" in stream) return <Image id={index} src={stream.image} />;

        if ("video" in stream)
          return (
            <Video
              id={index}
              src={`${import.meta.env.VITE_VIDEO_DATA_DIR}${stream.video}`}
            />
          );

        if ("short" in stream)
          return (
            <Video
              id={index}
              src={`${import.meta.env.VITE_SHORT_DATA_DIR}${stream.short}`}
            />
          );
      })}
    </>
  );
}

export default App;
