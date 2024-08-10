import React, { useState, useRef } from "react";

const defaultOptions = {
  video: true,
  photo: true,
  short: true,
};

export default function OptionsMenu() {
  const [options, setOptions] = useState(defaultOptions); // options that are currently set
  const isOptionsOpen = useRef(false);

  function toggleOption(e) {
    const btn: HTMLElement = e.target;
    var option = btn.className;
    option = option.split("-")[1];
    option = option.split(" ")[0];

    const newOptions = { ...options };
    newOptions[option] = !newOptions[option];
    setOptions(newOptions);

    newOptions[option] ? btn.classList.add("on") : btn.classList.remove("on");
    updateOptions(newOptions);
  }

  return (
    <div className="options-drawer">
      <div className="media-options">
        <span>Choose Media</span>
        <button className="display-video on" onClick={toggleOption}>
          Video
        </button>
        <button className="display-photo on" onClick={toggleOption}>
          Photo
        </button>
        <button className="display-short on" onClick={toggleOption}>
          Short
        </button>
      </div>
    </div>
  );
}
