import * as React from "react";

import ThemeState, {ThemeAction} from "@sentrei/types/states/ThemeState";

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      throw new Error();
  }
};

const DispatchContext = React.createContext<React.Dispatch<ThemeAction>>(
  () => null,
);

export default DispatchContext;
