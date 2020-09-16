import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function AnalyticsBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <Typography
        variant="h1"
        component="h1"
        align="center"
        color="textSecondary"
      >
        <RoughNotation
          animationDelay={300}
          animationDuration={3000}
          strokeWidth={3}
          iterations={3}
          color="primary"
          text={t("analytics:analytics.title")}
          type="underline"
        />
      </Typography>
    </Container>
  );
}
