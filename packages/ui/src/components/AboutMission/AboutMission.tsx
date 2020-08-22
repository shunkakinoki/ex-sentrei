import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Emoji} from "emoji-mart";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function PricingBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <Box p={1} />
      <Typography
        variant="h6"
        component="h6"
        align="center"
        color="primary"
        gutterBottom
      >
        {t("about:mission.title")}
      </Typography>
      <Typography
        variant="h1"
        component="h2"
        align="center"
        color="textSecondary"
      >
        {t("about:mission.mission")}
      </Typography>
      <Box p={1} />
      <Typography
        variant="h5"
        component="h5"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        {t("about:mission.target")}
      </Typography>
      <Typography
        variant="h5"
        component="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <RoughNotation
          animationDelay={300}
          animationDuration={3000}
          strokeWidth={3}
          iterations={3}
          color="primary"
          text={t("about:mission.special")}
          type="underline"
        />
        &nbsp;
        <Emoji emoji=":rocket:" set="apple" size={20} />
      </Typography>
    </Container>
  );
}
