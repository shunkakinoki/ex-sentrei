import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

import LandingSectionStyles from "./LandingSectionStyles";

export interface Props {
  subTitle: string;
  title: string;
}

export default function LandingSection({subTitle, title}: Props): JSX.Element {
  const classes = LandingSectionStyles();

  return (
    <Container maxWidth="sm" component="main" className={classes.section}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <RoughNotation
          color="primary"
          strokeWidth={3}
          iterations={3}
          text={title}
          type="underline"
        />
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        {subTitle}
      </Typography>
    </Container>
  );
}
