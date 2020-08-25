import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import LogoStyles from "./LogoStyles";

export interface Props {
  as?: string;
  href: string;
  logo: JSX.Element;
}

export default function Logo({as, logo, href}: Props): JSX.Element {
  const classes = LogoStyles();

  return (
    <MuiButtonBase href={href} as={as} className={classes.logo}>
      {logo}
    </MuiButtonBase>
  );
}
