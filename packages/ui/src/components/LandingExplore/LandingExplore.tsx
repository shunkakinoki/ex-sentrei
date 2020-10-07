import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export default function LandingExplore(): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          align="center"
          component="h6"
          variant="h6"
          color={theme.palette.type === "light" ? "primary" : "inherit"}
        >
          {t("index:explore.title")}
        </Typography>
        <ArrowDropDownIcon
          fontSize="large"
          color={theme.palette.type === "light" ? "primary" : "inherit"}
        />
      </Box>
    </Container>
  );
}
