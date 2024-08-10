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
