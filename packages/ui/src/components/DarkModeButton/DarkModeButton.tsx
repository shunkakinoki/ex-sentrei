import * as React from "react";

import {DarkModeSwitch} from "react-toggle-dark-mode";

import useDarkMode from "use-dark-mode";

import AuthContext from "@sentrei/common/context/AuthContext";
import {updateUser} from "@sentrei/common/firebase/users";
import {trackEvent} from "@sentrei/common/utils/segment";

function DarkModeButton(): JSX.Element {
  const {user} = React.useContext(AuthContext);

  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  const handleClick = (): void => {
    const mode = isDark ? "dark" : "light";
    toggleDarkMode();
    if (user) {
      updateUser({mode}, user.uid);
    }
    trackEvent("Toggle Dark Mode", {value: mode});
  };

  return <DarkModeSwitch checked={isDark} onChange={handleClick} />;
}

export default DarkModeButton;
