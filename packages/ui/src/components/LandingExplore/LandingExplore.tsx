import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export default function LandingOutline(): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Typography
        align="center"
        component="h6"
        variant="h6"
        color={theme.palette.type === "light" ? "primary" : "inherit"}
      >
        {t("index:explore.title")}
      </Typography>
    </Container>
  );
}
