import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import SpaceNoneStyles from "./SpaceNoneStyles";

export default function SpaceNone(): JSX.Element {
  const classes = SpaceNoneStyles();
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        alignItems="center"
        alignContent="center"
        direction="row"
        justifyContent="center"
        spacing={3}
        className={classes.grid}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h4"
            align="center"
            color="textSecondary"
            component="h5"
          >
            {t("space:dashboard.none")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box m={3}>
            <MuiButton
              fullWidth
              href="/create"
              variant="outlined"
              color="primary"
              size="medium"
              startIcon={<AddIcon />}
            >
              {t("space:dashboard.create")}
            </MuiButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
