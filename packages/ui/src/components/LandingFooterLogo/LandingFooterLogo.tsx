import ButtonBase from "@material-ui/core/ButtonBase";
import * as React from "react";

import LandingFooterLogoStyles from "./LandingFooterLogoStyles";

export interface Props {
  logo: JSX.Element;
}

export default function LandingFooterLogo({logo}: Props): JSX.Element {
  const classes = LandingFooterLogoStyles();

  return (
    <ButtonBase disabled className={classes.logo}>
      {logo}
    </ButtonBase>
  );
}
