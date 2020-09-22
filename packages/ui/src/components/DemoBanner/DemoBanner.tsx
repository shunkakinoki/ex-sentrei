import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Emoji} from "emoji-mart";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function DemoBanner(): JSX.Element {
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
          text={t("pitch:pitch.title")}
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
        {t("pitch:pitch.greetings")}
        &nbsp;
        <Emoji emoji=":fire:" set="apple" size={30} />
      </Typography>
    </Container>
  );
}
