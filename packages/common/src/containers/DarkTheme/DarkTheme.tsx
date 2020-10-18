import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";

const DarkTheme = createMuiTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#e6739f",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      '"Noto Serif JP"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
} as SentreiTheme);

export default responsiveFontSizes(DarkTheme);
