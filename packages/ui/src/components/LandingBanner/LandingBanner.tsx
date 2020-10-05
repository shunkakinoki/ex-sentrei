import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";

import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
import {trackEvent} from "@sentrei/common/utils/segment";
import AuthFormGoogleButton from "@sentrei/ui/components/AuthFormGoogleButton";
import LandingBannerGradient from "@sentrei/ui/components/LandingBannerGradient";
import MuiButton from "@sentrei/ui/components/MuiButton";
import RoughNotation from "@sentrei/ui/components/RoughNotation";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import BannerStyles from "./LandingBannerStyles";

export default function LandingBanner(): JSX.Element {
  const classes = BannerStyles();
  const {snackbar} = useSnackbar();
  const {t, lang} = useTranslation();
  const {push, query} = useRouter();

  const google = (): void => {
    snackbar("info", t("snackbar:snackbar.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        trackEvent("Sign In", {provider: "google"});
        if (query.redirect) {
          push(String(query.redirect));
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  return (
    <Container maxWidth="sm" component="main">
      <LandingBannerGradient />
      <Box p={1} />
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        className={classes.text}
      >
        {t("index:banner.bannerTextOne")}
      </Typography>
      <Typography
        gutterBottom
        variant="h5"
        align="center"
        color="textSecondary"
        className={classes.text}
      >
        {t("index:banner.bannerTextTwo")}
        &nbsp;
        <RoughNotation
          animationDelay={300}
          animationDuration={3000}
          color="secondary-light"
          text={t("index:banner.bannerTextRough")}
          type="highlight"
        />
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
        noWrap
        className={classes.text}
      >
        {t("index:banner.bannerTextThree")}
      </Typography>
      <Box py={1} />
      <Grid container justify="center" direction="row" spacing={1}>
        <Grid item xs={12} md={6}>
          <div className={classes.item}>
            <MuiButton
              color="primary"
              variant="contained"
              className={classes.button}
              href="/signup"
            >
              <Typography noWrap>{t("index:banner.startText")}</Typography>
            </MuiButton>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.item}>
            <AuthFormGoogleButton
              onClick={(): void => google()}
              title={t("index:banner.googleText")}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
