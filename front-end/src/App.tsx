import { Card } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors" as RequestMode,
      };

      var res = await fetch(
        `http://${import.meta.env.VITE_LOCAL_IPv4}:3000/images`,
        requestOptions
      );
      var data = await res.json();
      setImages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {images.map((image, index) => (
        <Card
          key={index}
          className="max-w-md  mx-auto bg-zinc-800 border-0 rounded-none"
          imgSrc={`${import.meta.env.VITE_DATA_DIR}${image}`}
        />
      ))}
    </>
  );
}

export default App;
