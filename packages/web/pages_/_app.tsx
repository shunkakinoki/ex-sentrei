import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider as MaterialThemeProvider} from "@material-ui/core/styles";
import {AppProps} from "next/app";
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
import "@sentrei/common/utils/sentry";
import "@sentrei/web/styles/global.scss";
import "@sentrei/web/styles/nprogress.scss";

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
