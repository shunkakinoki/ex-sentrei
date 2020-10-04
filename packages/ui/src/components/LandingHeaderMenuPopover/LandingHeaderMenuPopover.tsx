import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import LandingHeaderMenuPopoverStyles from "./LandingHeaderMenuPopoverStyles";

export interface Props {
  href: string;
  title: string;
}

export default function LandingHeaderMenuPopover({
  href,
  title,
}: Props): JSX.Element {
  const classes = LandingHeaderMenuPopoverStyles();

  return (
    <MuiButton className={classes.button} href={href}>
      <Typography>{title}</Typography>
    </MuiButton>
  );
}
