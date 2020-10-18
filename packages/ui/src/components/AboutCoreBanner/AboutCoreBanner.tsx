import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-locale/useTranslation";
import * as React from "react";

export default function AboutCoreBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="lg" component="main">
      <Box p={1} />
      <Typography
        variant="h3"
        component="h3"
        align="center"
        color="primary"
        gutterBottom
      >
        {t("about:core.title")}
      </Typography>
      <Typography
        variant="h5"
        component="h6"
        align="center"
        color="textSecondary"
      >
        {t("about:core.root")}
      </Typography>
      <Box p={1} />
    </Container>
  );
}
