import {Theme} from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
  }
  interface ThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
  }
}

export default interface SentreiTheme extends Theme {
  sidebarWidth: number;
  sidebarMobileHeight: number;
}
