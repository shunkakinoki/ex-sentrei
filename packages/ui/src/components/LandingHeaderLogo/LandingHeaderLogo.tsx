import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import LandingHeaderLogoStyles from "./LandingHeaderLogoStyles";

export interface Props {
  as?: string;
  href: string;
  logo: JSX.Element;
}

export default function LandingHeaderLogo({
  as,
  logo,
  href,
}: Props): JSX.Element {
  const classes = LandingHeaderLogoStyles();

  return (
    <MuiButtonBase href={href} as={as} className={classes.logo}>
      {logo}
    </MuiButtonBase>
  );
}
