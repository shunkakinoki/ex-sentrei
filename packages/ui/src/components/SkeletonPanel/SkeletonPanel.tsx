import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";

import SkeletonPanelStyles from "./SkeletonPanelStyles";

export default function SkeletonPanel(): JSX.Element {
  const classes = SkeletonPanelStyles();

  return (
    <Container maxWidth="xs">
      <Box p={1}>
        <Skeleton className={classes.panel} />
      </Box>
    </Container>
  );
}
