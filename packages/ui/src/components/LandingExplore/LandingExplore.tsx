import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingCaption from "@sentrei/ui/components/LandingCaption";

export default function LandingExplore(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <LandingCaption>{t("index:explore.title")}</LandingCaption>
    </Container>
  );
}
