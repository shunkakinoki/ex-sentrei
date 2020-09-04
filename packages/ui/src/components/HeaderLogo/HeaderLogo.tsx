import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import HeaderLogoStyles from "./HeaderLogoStyles";

export interface Props {
  as?: string;
  href: string;
  logo: JSX.Element;
}

export default function HeaderLogo({as, logo, href}: Props): JSX.Element {
  const classes = HeaderLogoStyles();

  return (
    <MuiButtonBase href={href} as={as} className={classes.logo}>
      {logo}
    </MuiButtonBase>
  );
}
