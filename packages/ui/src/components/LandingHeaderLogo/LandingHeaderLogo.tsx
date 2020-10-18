import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import LandingHeaderLogoStyles from "./LandingHeaderLogoStyles";

export interface Props {
  href: string;
  logo: JSX.Element;
}

export default function LandingHeaderLogo({logo, href}: Props): JSX.Element {
  const classes = LandingHeaderLogoStyles();

  return (
    <MuiButtonBase href={href} className={classes.logo}>
      {logo}
    </MuiButtonBase>
  );
}
