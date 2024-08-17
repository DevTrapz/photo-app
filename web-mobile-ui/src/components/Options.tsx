import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "./../index.css";

interface props {
  refreshFeed: () => void;
}

export default function Options({ refreshFeed }: props) {
  const [cookies, setCookies] = useCookies(["preferences"]);

  function toggleOption(e: any) {
    const btn: HTMLElement = e.currentTarget;
    const option = btn.id;
    const cookie = cookies.preferences;
    var displayOptions = cookie["display-options"];

    if (
      displayOptions.some((displayOption: string) => displayOption == option)
    ) {
      displayOptions = displayOptions.filter(
        (displayOption: string) => displayOption != option
      );
    } else {
      displayOptions.push(option);
    }
    setCookies("preferences", { "display-options": displayOptions });
  }
  function setPreferredOptions() {
    var preferences = cookies.preferences["display-options"];
    var elements = document.querySelectorAll("[class^=display]");

    [...elements].map((element) => {
      const option = element.id;
      if (preferences.some((type: string) => type == option)) {
        element.classList.remove("bg-gray-800");
        element.classList.remove("text-white");
        element.classList.add("bg-white");
        element.classList.add("text-black");
      } else {
        element.classList.remove("bg-white");
        element.classList.remove("text-black");
        element.classList.add("bg-gray-800");
        element.classList.add("text-white");
      }
      ("");
    });

    elements;
  }

  useEffect(() => {
    setPreferredOptions();
  }, [cookies.preferences]);

  const buttonCSS = "px-2 py-0.5 my-1 mx-0.5 text-lg rounded-lg";

  return (
    <>
      <div className="sticky top-0 backdrop-blur-md">
        <div className="bg-black z-10 opacity-80">
          <div className="flex max-w-md mx-auto">
            <button
              id="refresh"
              onClick={refreshFeed}
              className={`display-refresh ${buttonCSS}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
            <span className="py-auto self-center mx-0.5 text-xl rounded-lg text-white">
              |
            </span>
            <button
              id="video"
              onClick={toggleOption}
              className={`display-video ${buttonCSS}`}
            >
              Video
            </button>
            <button
              id="photo"
              onClick={toggleOption}
              className={`display-photo ${buttonCSS}`}
            >
              Photo
            </button>
            <button
              id="short"
              onClick={toggleOption}
              className={`display-short ${buttonCSS}`}
            >
              Short
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
