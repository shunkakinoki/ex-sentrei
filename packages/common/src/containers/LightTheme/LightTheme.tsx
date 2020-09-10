import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";

const LightTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ffdbe2",
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

export default responsiveFontSizes(LightTheme);
