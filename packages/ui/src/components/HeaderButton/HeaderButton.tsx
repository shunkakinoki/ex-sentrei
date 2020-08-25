import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import HeaderButtonStyles from "./HeaderButtonStyles";

export interface Props {
  href: string;
  title: string;
}

export default function Header({href, title}: Props): JSX.Element {
  const classes = HeaderButtonStyles();

  return (
    <MuiButton className={classes.button} href={href}>
      <Typography>{title}</Typography>
    </MuiButton>
  );
}
