import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export interface Props {
  icon: JSX.Element;
  title: String;
  button?: JSX.Element;
}

export default function SpaceSection({
  icon,
  title,
  button,
}: Props): JSX.Element {
  return (
    <Grid container alignItems="center" justify="flex-start" direction="row">
      <Box m={1}>{icon}</Box>
      <Typography
        align="center"
        variant="h5"
        component="h6"
        color="textSecondary"
      >
        {title}
      </Typography>
      {button}
    </Grid>
  );
}
