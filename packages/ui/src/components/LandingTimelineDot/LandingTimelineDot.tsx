import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Filter1RoundedIcon from "@material-ui/icons/Filter1Rounded";
import HotelIcon from "@material-ui/icons/Hotel";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import RepeatIcon from "@material-ui/icons/Repeat";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingTimelineDotStyles from "./LandingTimelineDotStyles";

export default function LandingTimelineDot(): JSX.Element {
  const classes = LandingTimelineDotStyles();
  const {t} = useTranslation();

  return (
    <Timeline align="alternate">
      <TimelineItem className={classes.top}>
        <TimelineSeparator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent />
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Filter1RoundedIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent />
      </TimelineItem>
    </Timeline>
  );
}
