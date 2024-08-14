import App from "./App";
import OptionsMenu from "./components/OptionsMenu";
import { CookiesProvider, useCookies } from "react-cookie";

export default function Layout() {
  const [cookies, setCookies] = useCookies(["preferences"]);

  if (!cookies.preferences)
    setCookies("preferences", {
      "display-options": ["video", "photo", "short"],
    });

  return (
    <CookiesProvider>
      <OptionsMenu />
      <App />
    </CookiesProvider>
  );
}
