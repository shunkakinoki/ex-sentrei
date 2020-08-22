import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import NotificationNoneStyles from "./NotificationNoneStyles";

export default function NotificationNone(): JSX.Element {
  const classes = NotificationNoneStyles();
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        alignItems="center"
        alignContent="center"
        direction="row"
        justify="center"
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
            {t("notifications:notifications.none")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
