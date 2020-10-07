import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import * as React from "react";

import LandingTimelineDotStyles from "./LandingTimelineDotStyles";

export default function LandingTimelineDot(): JSX.Element {
  const classes = LandingTimelineDotStyles();

  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector classes={{root: classes.rootLine}} />
        </TimelineSeparator>
        <TimelineContent />
      </TimelineItem>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton className={classes.top} disabled>
          <LooksOneIcon className={classes.icon} fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
}
