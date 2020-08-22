import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export default function PricingBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="lg" component="main">
      <Box p={1} />
      <Typography
        variant="h6"
        component="h6"
        align="center"
        color="primary"
        gutterBottom
      >
        {t("about:team.title")}
      </Typography>
      <Typography
        variant="h4"
        component="h5"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        {t("about:team.meet")}
      </Typography>
    </Container>
  );
}
