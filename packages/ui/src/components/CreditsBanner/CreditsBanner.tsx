import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Emoji} from "emoji-mart";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function LandingBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="sm" component="main">
      <Box p={1} />
      <Typography
        variant="h1"
        component="h1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <RoughNotation
          animationDelay={300}
          animationDuration={3000}
          strokeWidth={10}
          iterations={3}
          color="secondary"
          text={t("credits:banner.thankYou")}
          type="underline"
        />
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        {t("credits:banner.journey")}{" "}
        <Emoji emoji=":rocket:" set="twitter" size={30} />
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        align="center"
        color="textSecondary"
      >
        {t("credits:banner.support")}
      </Typography>
      <Box pr={3}>
        <Typography
          variant="subtitle1"
          align="right"
          color="textSecondary"
          component="p"
        >
          <RoughNotation
            animationDelay={3000}
            animationDuration={3000}
            color="secondary"
            text={t("credits:banner.fromSentreiTeam")}
            type="highlight"
          />
        </Typography>
      </Box>
    </Container>
  );
}
