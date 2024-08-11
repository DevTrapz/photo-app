import React, { useRef, useEffect } from "react";
import { useCookies } from "react-cookie";

interface preferences {
  "display-video"?: boolean;
  "display-photo"?: boolean;
  "display-short"?: boolean;
}


export default function OptionsMenu() {
  const [cookies, setCookies] = useCookies(["preferences"]);
  const isOptionsOpen = useRef(false);

  function getDisplayType(element: HTMLElement) {
    var option = element.className;
    return option.split(" ")[0];
  }

  function toggleOption(e) {
    const btn: HTMLElement = e.target;
    const option = getDisplayType(btn);

    const newOptions: preferences = { ...cookies.preferences };
    option in newOptions
      ? (newOptions[option] = !newOptions[option])
      : (newOptions[option] = false);

    setCookies("preferences", newOptions);

    newOptions[option] ? btn.classList.add("on") : btn.classList.remove("on");
  }

  function setPreferredOptions() {
    var preferences = Object.entries(cookies.preferences);
    var filter = [];
    preferences.map((preference) => {
      if (preference[1]) return;
      filter.push(preference[0]);
    });

    var elements = document.querySelectorAll("[class^=display]");
    [...elements].map((element: HTMLElement) => {
      const option = getDisplayType(element);
      !filter.some((type) => type == option) && element.classList.add("on");
    });
  }

  useEffect(() => {
    setPreferredOptions();
  }, []);

  return (
    <div className="options-drawer">
      <div className="media-options">
        <h1>Choose Media</h1>
        <button className="display-video" onClick={toggleOption}>
          Video
        </button>
        <button className="display-photo" onClick={toggleOption}>
          Photo
        </button>
        <button className="display-short" onClick={toggleOption}>
          Short
        </button>
      </div>
    </div>
  );
}
