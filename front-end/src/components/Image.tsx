import React from "react";

export default function Image({ src, id }) {
  return (
    <img
      key={id}
      id={id}
      className="max-w-md w-full mx-auto mb-8"
      src={`${import.meta.env.VITE_IMAGE_DATA_DIR}${src}`}
    />
  );
}
