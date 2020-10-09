import Typography from "@material-ui/core/Typography";
import * as React from "react";

import LandingTaglineStyles from "./LandingTaglineStyles";

export interface Props {
  children: string;
}

export default function LandingTagline({children}: Props): JSX.Element {
  const classes = LandingTaglineStyles();

  return (
    <Typography align="center" className={classes.typography}>
      {children}
    </Typography>
  );
}
