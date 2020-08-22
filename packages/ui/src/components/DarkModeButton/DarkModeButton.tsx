import * as React from "react";

import {DarkModeSwitch} from "react-toggle-dark-mode";

import useDarkMode from "use-dark-mode";

function DarkModeButton(): JSX.Element {
  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  return <DarkModeSwitch checked={isDark} onChange={toggleDarkMode} />;
}

export default DarkModeButton;
