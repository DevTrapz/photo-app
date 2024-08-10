import React from "react";
import App from "./App";
import OptionsMenu from "./components/OptionsMenu";
import { CookiesProvider } from "react-cookie";

export default function Layout() {
  return (
    <CookiesProvider>
      <OptionsMenu />
      <App />
    </CookiesProvider>
  );
}
