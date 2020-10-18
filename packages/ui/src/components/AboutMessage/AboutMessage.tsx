import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Emoji} from "emoji-mart";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

export default function AboutMessage(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="lg" component="main">
      <Typography
        variant="h6"
        component="h6"
        align="center"
        color="textSecondary"
      >
        {t("about:message.important")}
      </Typography>
      <Typography variant="h3" component="h4" align="center" color="primary">
        {t("about:message.thankYou")}
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        align="center"
        color="textSecondary"
      >
        {t("about:message.journey")}
        &nbsp;
        <MuiButtonBase aria-label="emoji" href="/credits">
          <Emoji emoji=":sports_medal:" set="twitter" size={24} />
        </MuiButtonBase>
      </Typography>
      <Box p={1} />
    </Container>
  );
}
