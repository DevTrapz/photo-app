import { useState } from "react";
import Feed from "./components/Feed";
import Options from "./components/Options";
import { CookiesProvider, useCookies } from "react-cookie";

export default function App() {
  const [cookies, setCookies] = useCookies(["preferences"]);
  const [refresh, triggerRefresh] = useState(0);

  if (!cookies.preferences)
    setCookies("preferences", {
      "display-options": ["video", "photo", "short"],
    });

  function refreshFeed() {
    triggerRefresh((refresh) => refresh + 1);
  }

  return (
    <CookiesProvider>
      <Options refreshFeed={refreshFeed} />
      <Feed refresh={refresh} />
    </CookiesProvider>
  );
}
