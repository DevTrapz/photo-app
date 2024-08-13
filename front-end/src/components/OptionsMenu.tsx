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
    const btn: HTMLElement = e.currentTarget;
    const option = btn.id;
    const cookie = cookies.preferences;
    var displayOptions = cookie["display-options"];

    if (displayOptions.some((displayOption) => displayOption == option)) {
      displayOptions = displayOptions.filter(
        (displayOption) => displayOption != option
      );
    } else {
      displayOptions.push(option);
    }
    setCookies("preferences", { "display-options": displayOptions });
  }
  function setPreferredOptions() {
    var preferences = cookies.preferences["display-options"];
    var elements = document.querySelectorAll("[class^=display]");
    [...elements].map((element: HTMLElement) => {
      const option = element.id;
      if (preferences.some((type) => type == option)) {
        element.classList.remove("bg-gray-200");
        element.classList.add("bg-cyan-700");
      } else {
        element.classList.remove("bg-cyan-700");
        element.classList.add("bg-gray-200");
      }
      ("");
    });

    elements;
  }

  useEffect(() => {
    setPreferredOptions();
  }, [cookies.preferences]);

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
