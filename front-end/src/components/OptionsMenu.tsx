import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Drawer } from "flowbite-react";
import "./OptionStyles.css";

export default function OptionsMenu() {
  const [cookies, setCookies] = useCookies(["preferences"]);
  const [isOpen, setIsOpen] = useState(false);

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

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="flex max-w-md w-full mx-auto flex-row-reverse">
        <button onClick={handleOpen} className="fixed z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-15 text-white my-4;"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
      </div>

      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="top"
        className="max-w-md w-full mx-auto"
      >
        <Drawer.Header title="Choose Media" />
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <button
              id="video"
              onClick={toggleOption}
              className="display-video py-2 text-white hover:bg-cyan-800 rounded-lg"
            >
              Video
            </button>
            <button
              id="photo"
              onClick={toggleOption}
              className="display-photo py-2 text-white hover:bg-cyan-800 rounded-lg"
            >
              Photo
            </button>
            <button
              id="short"
              onClick={toggleOption}
              className="display-short py-2 text-white hover:bg-cyan-800 rounded-lg"
            >
              Short
            </button>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
