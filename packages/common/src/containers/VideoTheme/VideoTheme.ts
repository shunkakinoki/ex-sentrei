import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";

const theme = createMuiTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F22F46",
    },
  },
  sidebarWidth: 260,
  sidebarMobileHeight: 90,
} as SentreiTheme);

export default responsiveFontSizes(theme);
