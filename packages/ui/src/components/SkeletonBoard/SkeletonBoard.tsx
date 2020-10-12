import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import * as React from "react";

import SkeletonCard from "@sentrei/ui/components/SkeletonCard";

export default function SkeletonBoard(): JSX.Element {
  return (
    <>
      <Box py={2} />
      <Container maxWidth="lg" component="main">
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          {[...Array(3)].map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid item key={i} xs={12} sm={6} md={4}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
