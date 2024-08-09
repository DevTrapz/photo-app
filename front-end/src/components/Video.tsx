import React from "react";

export default function Video({ src, id }) {
  return (
    <>
      <video
        id={id}
        controls
        preload="metadata"
        loop={true}
        autoPlay={true}
        muted={true}
        className="max-w-md w-full mx-auto mb-8"
      >
        <source src={src} type="video/mp4"></source>
      </video>
    </>
  );
}
