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

  function cleanFilterData(data: String[]) {
    data = data.map((mediaType) => {
      mediaType = mediaType.split("-")[1];
      if (mediaType == "photo") mediaType = "image";
      return mediaType;
    });
    return data;
  }

  function filterMediaPreferences() {
    var preferences = Object.entries(cookies.preferences);
    var filter = [];
    preferences.map((preference) => {
      if (!preference[1]) return;
      filter.push(preference[0]);
    });

    filter = cleanFilterData(filter);

    const newStream = dataStream.filter((media) =>
      filter.some((mediaType) => mediaType in media)
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
