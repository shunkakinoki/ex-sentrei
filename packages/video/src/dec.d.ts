/* eslint-disable @typescript-eslint/no-explicit-any */

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

declare interface Window {
  webkitAudioContext: any;
  twilioRoom: any;
  TwilioVideo: any;
}
