import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Emoji} from "emoji-mart";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";
import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function PricingBanner(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <Box p={1} />
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
          text={t("pricing:pricing.title")}
          type="underline"
        />
      </Typography>
      <Box p={1} />
      <MuiLink href="/support" color="secondary">
        <Typography
          variant="h6"
          component="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {t("pricing:pricing.questions")}
          &nbsp;
          <Emoji emoji=":grin:" set="twitter" size={30} />
        </Typography>
      </MuiLink>
    </Container>
  );
}
