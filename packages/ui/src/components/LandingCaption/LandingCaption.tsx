import Typography from "@material-ui/core/Typography";
import * as React from "react";

export interface Props {
  children: string;
}

export default function LandingCaption({children}: Props): JSX.Element {
  return (
    <Typography align="center" component="p" variant="button" color="primary">
      {children}
    </Typography>
  );
}
