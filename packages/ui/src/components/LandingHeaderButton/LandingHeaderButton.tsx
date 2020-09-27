import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import LandingHeaderButtonStyles from "./LandingHeaderButtonStyles";

export interface Props {
  href: string;
  title: string;
}

export default function LandingHeaderButton({href, title}: Props): JSX.Element {
  const classes = LandingHeaderButtonStyles();

  return (
    <MuiButton className={classes.button} href={href}>
      <Typography>{title}</Typography>
    </MuiButton>
  );
}
