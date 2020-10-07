import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export default function LandingExplore(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <Typography align="center" component="h6" variant="h6" color="primary">
        {t("index:explore.title")}
      </Typography>
    </Container>
  );
}
