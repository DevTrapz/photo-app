import { useState } from "react";
import App from "./App";
import OptionsMenu from "./components/OptionsMenu";
import { CookiesProvider, useCookies } from "react-cookie";

export default function Layout() {
  const [cookies, setCookies] = useCookies(["preferences"]);
  const [refresh, triggerRefresh] = useState(0);

  if (!cookies.preferences)
    setCookies("preferences", {
      "display-options": ["video", "photo", "short"],
    });

  function refreshApp() {
    triggerRefresh((refresh) => refresh + 1);
  }

  return (
    <CookiesProvider>
      <OptionsMenu refreshApp={refreshApp} />
      <App refresh={refresh} />
    </CookiesProvider>
  );
}
