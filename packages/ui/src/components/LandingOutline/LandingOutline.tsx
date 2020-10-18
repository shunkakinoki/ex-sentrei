import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

import LandingOutlineStyles from "./LandingOutlineStyles";

export default function LandingOutline(): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();
  const classes = LandingOutlineStyles();

  return (
    <Container maxWidth="md">
      <Typography component="h3" variant="h3" align="center">
        <div className={classes.container}>
          <Typography className={classes.typography}>
            {t("index:outline.problem.one")}
            &nbsp;
            <RoughNotation
              animationDelay={300}
              animationDuration={3000}
              color={theme.palette.error.light}
              text={t("index:outline.problem.rough")}
              strokeWidth={9}
              type="underline"
            />
            &nbsp;
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
