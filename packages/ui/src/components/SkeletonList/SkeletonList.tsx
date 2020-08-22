import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";

import SkeletonPanel from "@sentrei/ui/components/SkeletonPanel";

import SkeletonListStyles from "./SkeletonListStyles";

export default function SkeletonList(): JSX.Element {
  const classes = SkeletonListStyles();

  return (
    <>
      <SkeletonPanel />
      <Container maxWidth="md" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {[...Array(7)].map(e => (
            <Grid item key={e} xs={12}>
              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.list}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
