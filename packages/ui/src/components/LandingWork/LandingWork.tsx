import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingTagline from "@sentrei/ui/components/LandingTagline";
import LandingTimelinePoint from "@sentrei/ui/components/LandingTimelinePoint";

export default function LandingWork(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <LandingTimelinePoint type="work" />
      <Box py={1} />
      <LandingTagline>{t("index:work.tagline")}</LandingTagline>
    </Container>
  );
}
