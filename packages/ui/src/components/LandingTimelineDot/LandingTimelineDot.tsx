import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import LooksOneIcon from "@material-ui/icons/LooksOne";
import * as React from "react";

import LandingTimelineDotStyles from "./LandingTimelineDotStyles";

export default function LandingTimelineDot(): JSX.Element {
  const classes = LandingTimelineDotStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton className={classes.top} disabled>
        <LooksOneIcon className={classes.icon} fontSize="large" />
      </IconButton>
    </Box>
  );
}
