import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";
import RoughNotation from "@sentrei/ui/components/RoughNotation";

export default function HomeScreen(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <Box py={9} />
      <Typography align="center" component="h1" variant="h1">
        <RoughNotation
          animationDelay={0}
          animationDuration={3000}
          strokeWidth={9}
          color="secondary"
          text="404"
          type="underline"
        />
      </Typography>
      <Box py={6} />
      <Typography variant="h5" align="center" color="textSecondary">
        {t("_error:error.pageNotFound")}
      </Typography>
      <Box py={6} />
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Box p={1}>
            <MuiButton fullWidth href="/" color="primary" variant="contained">
              {t("common:common.goHome")}
            </MuiButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
