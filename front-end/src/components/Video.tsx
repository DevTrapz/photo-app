import React from "react";

export default function Video({ src, key }) {
  return (
    <>
      <video
        key={key}
        id="my-player"
        controls
        preload="metadata"
        loop={true}
        autoPlay={true}
        // poster="//vjs.zencdn.net/v/oceans.png"
        data-setup='{ "autoplay": true, "loop": true }'
        className="max-w-md w-full mx-auto mb-10"
      >
        <source src={src} type="video/mp4"></source>
      </video>
    </>
  );
}
