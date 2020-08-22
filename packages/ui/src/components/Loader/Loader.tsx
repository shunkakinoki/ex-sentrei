import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as React from "react";

export default function Spacing(): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress size={100} thickness={1} />
    </Box>
  );
}
