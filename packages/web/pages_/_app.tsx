import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider as MaterialThemeProvider} from "@material-ui/core/styles";
import * as Sentry from "@sentry/browser";
import {RewriteFrames} from "@sentry/integrations";
import {AppProps} from "next/app";
import getConfig from "next/config";
import Head from "next/head";
import * as React from "react";
import {RecoilRoot} from "recoil";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import useDarkMode from "use-dark-mode";

import DarkTheme from "@sentrei/common/containers/DarkTheme";
import LightTheme from "@sentrei/common/containers/LightTheme";
import AuthContext from "@sentrei/common/context/AuthContext";
import GlobalContext from "@sentrei/common/context/GlobalContext";
import BackdropEmitter from "@sentrei/common/utils/backdrop";
import SnackbarEmitter from "@sentrei/common/utils/snackbar";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import Authentication from "@sentrei/ui/components/Authentication";
import Backdrop from "@sentrei/ui/components/Backdrop";
import Snackbar from "@sentrei/ui/components/Snackbar";

import "@sentrei/common/utils/nprogress";
import "@sentrei/web/styles/global.scss";
import "@sentrei/web/styles/nprogress.scss";

const config = getConfig();
const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
Sentry.init({
  enabled: true,
  integrations: [
    new RewriteFrames({
      iteratee: (frame: Sentry.StackFrame): Sentry.StackFrame => {
        // eslint-disable-next-line no-param-reassign
        frame.filename = frame?.filename?.replace(distDir, "app:///_next");
        return frame;
      },
    }),
  ],
  dsn: process.env.SENTRY_DSN,
});

const CustomApp = ({Component, pageProps}: AppProps): JSX.Element => {
  const [user, setUser] = React.useState<User.Get | null | undefined>(
    undefined,
  );
  const [profile, setProfile] = React.useState<Profile.Get | null>(null);

  const {value: isDark} = useDarkMode(true);
  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <>
      <Head>
        <title>Sentrei</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <CssBaseline />
          <AuthContext.Provider value={{profile, user, setProfile, setUser}}>
            <GlobalContext.Provider
              value={{backdrop: BackdropEmitter, snackbar: SnackbarEmitter}}
            >
              <RecoilRoot>
                <Authentication />
                <Backdrop />
                <Snackbar />
                <Component {...pageProps} />
              </RecoilRoot>
            </GlobalContext.Provider>
          </AuthContext.Provider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </>
  );
};

export default CustomApp;
