import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";

import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
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
    snackbar("info", t("common:snackbar.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        if (query.redirect) push(String(query.redirect));
      })
      .catch(err => snackbar("error", err.message));
  };

  return (
    <Container maxWidth="sm" component="main">
      <Typography component="h1" variant="h1" align="center">
        <LandingBannerGradient />
      </Typography>
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
        variant="h5"
        align="center"
        color="textSecondary"
        className={classes.text}
      >
        {t("index:banner.bannerTextTwo")}
        <RoughNotation
          animationDelay={3000}
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
      <Box pt={3} />
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
            <Button
              onClick={(): void => google()}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              <img
                width="15px"
                alt="google-sign-in"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className={classes.google}
              />
              <Typography noWrap>{t("index:banner.googleText")}</Typography>
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
