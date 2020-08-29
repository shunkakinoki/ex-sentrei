import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import SpaceAnalyticsNoneStyles from "./SpaceAnalyticsNoneStyles";

export default function SpaceAnalyticsNone(): JSX.Element {
  const classes = SpaceAnalyticsNoneStyles();
  const {t} = useTranslation();

  return (
    <Box py={10} className={classes.panel}>
      <Container maxWidth="lg" component="main">
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          component="h5"
        >
          {t("space:analytics.none")}
        </Typography>
        <Box p={3} />
      </Container>
    </Box>
  );
}
