import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import AboutTeamBanner from "@sentrei/ui/components/AboutTeamBanner";
import AboutTeamCard from "@sentrei/ui/components/AboutTeamCard";

import AboutTeamStyles from "./AboutTeamStyles";

export default function AboutTeam(): JSX.Element {
  const classes = AboutTeamStyles();

  return (
    <>
      <AboutTeamBanner />
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          className={classes.container}
        >
          <Grid item xs={12} sm={4}>
            <AboutTeamCard
              name="Shun Kakinoki"
              github="shunkakinoki"
              twitter="shunkakinoki"
              website="shunkakinoki.com"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
