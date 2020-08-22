import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";

import SkeletonFormStyles from "./SkeletonFormStyles";

export default function SkeletonForm(): JSX.Element {
  const classes = SkeletonFormStyles();

  return (
    <>
      <Container maxWidth="xs" component="main">
        <Box display="flex" justifyContent="center" mt={3}>
          <Skeleton variant="circle" className={classes.avatar} />
        </Box>
        <Box p={6}>
          <Skeleton variant="rect" className={classes.title} />
        </Box>
        <Grid container alignItems="center" justify="center" spacing={3}>
          {[...Array(3)].map(e => (
            <Grid item key={e} xs={12}>
              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.form}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
