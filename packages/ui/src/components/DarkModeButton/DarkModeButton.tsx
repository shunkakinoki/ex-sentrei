import * as React from "react";

import {DarkModeSwitch} from "react-toggle-dark-mode";

import useDarkMode from "use-dark-mode";

import {trackEvent} from "@sentrei/common/utils/segment";

function DarkModeButton(): JSX.Element {
  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  const handleClick = (): void => {
    toggleDarkMode();
    trackEvent("Toggle Dark Mode", {value: isDark ? "dark" : "light"});
  };

  return <DarkModeSwitch checked={isDark} onChange={handleClick} />;
}

export default DarkModeButton;
