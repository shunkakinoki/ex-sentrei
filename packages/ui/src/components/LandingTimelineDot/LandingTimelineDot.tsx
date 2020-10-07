import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import Looks3Icon from "@material-ui/icons/Looks3";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingTimelineDotStyles from "./LandingTimelineDotStyles";

export interface Props {
  type: "bond" | "focus" | "work";
}

export default function LandingTimelineDot({type}: Props): JSX.Element {
  const classes = LandingTimelineDotStyles();
  const {t} = useTranslation();

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
          {type === "bond" && (
            <LooksOneIcon className={classes.icon} fontSize="large" />
          )}
          {type === "focus" && (
            <LooksTwoIcon className={classes.icon} fontSize="large" />
          )}
          {type === "work" && (
            <Looks3Icon className={classes.icon} fontSize="large" />
          )}
        </IconButton>
      </Box>
      <Box py={2} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <div
          className={clsx(classes.typography, classes.gradient, classes.center)}
        >
          {t("index:banner.bannerHeaderTwo")}
        </div>
      </Box>
    </>
  );
}
