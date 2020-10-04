import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import LandingHeaderMenuStyles from "./LandingHeaderMenuStyles";

export interface Props {
  href: string;
  title: string;
}

export default function LandingHeaderMenu({href, title}: Props): JSX.Element {
  const classes = LandingHeaderMenuStyles();

  return (
    <MuiButton className={classes.button} href={href}>
      <Typography>{title}</Typography>
    </MuiButton>
  );
}
