import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

import LandingOutlineStyles from "./LandingOutlineStyles";

export default function LandingOutline(): JSX.Element {
  const {t} = useTranslation();
  const classes = LandingOutlineStyles();

  return (
    <Container maxWidth="md">
      <Typography component="h3" variant="h3" align="center">
        <div className={classes.container}>
          <Typography className={classes.typography}>
            {t("index:outline.problem.one")}
            <RoughNotation
              animationDelay={300}
              animationDuration={3000}
              color="secondary-light"
              text={t("index:outline.problem.rough")}
              type="highlight"
            />
            {t("index:outline.problem.two")}
          </Typography>
        </div>
        <div className={classes.container}>
          <Typography className={classes.typography}>
            {t("index:outline.solution")}
          </Typography>
          <div
            className={clsx(
              classes.typography,
              classes.gradient,
              classes.bottom,
            )}
          >
            {t("index:outline.solution")}
          </div>
        </div>
      </Typography>
    </Container>
  );
}
