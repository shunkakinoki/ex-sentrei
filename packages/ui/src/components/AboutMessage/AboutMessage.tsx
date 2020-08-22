import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Emoji} from "emoji-mart";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

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
        <Link href="/credits">
          <ButtonBase aria-label="emoji">
            <Emoji emoji=":sports_medal:" set="twitter" size={24} />
          </ButtonBase>
        </Link>
      </Typography>
      <Box p={1} />
    </Container>
  );
}
