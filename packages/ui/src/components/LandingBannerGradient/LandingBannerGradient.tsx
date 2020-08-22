import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingBannerGradientStyles from "./LandingBannerGradientStyles";

export default function LandingBannerGradient(): JSX.Element {
  const {t} = useTranslation();
  const classes = LandingBannerGradientStyles();

  return (
    <>
      <div className={classes.container}>
        <Typography className={classes.typography}>
          {t("index:banner.bannerHeaderOne")}
        </Typography>
        <div
          className={clsx(classes.typography, classes.gradient, classes.top)}
        >
          {t("index:banner.bannerHeaderOne")}
        </div>
      </div>
      <div className={classes.container}>
        <Typography className={classes.typography}>
          {t("index:banner.bannerHeaderTwo")}
        </Typography>
        <div
          className={clsx(classes.typography, classes.gradient, classes.center)}
        >
          {t("index:banner.bannerHeaderTwo")}
        </div>
      </div>
      <div className={classes.container}>
        <Typography className={classes.typography}>
          {t("index:banner.bannerHeaderThree")}
        </Typography>
        <div
          className={clsx(classes.typography, classes.gradient, classes.bottom)}
        >
          {t("index:banner.bannerHeaderThree")}
        </div>
      </div>
    </>
  );
}
