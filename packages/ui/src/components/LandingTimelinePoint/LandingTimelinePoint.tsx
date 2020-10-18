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
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import LandingTimelinePointStyles from "./LandingTimelinePointStyles";

export interface Props {
  type: "bond" | "focus" | "work";
}

export default function LandingTimelinePoint({type}: Props): JSX.Element {
  const classes = LandingTimelinePointStyles();
  const {t} = useTranslation();

  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            classes={{root: classes.rootLine}}
            className={clsx({
              [classes.topLine]: type === "bond",
              [classes.centerLine]: type === "focus",
              [classes.bottomLine]: type === "work",
            })}
          />
        </TimelineSeparator>
        <TimelineContent />
      </TimelineItem>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          className={clsx({
            [classes.top]: type === "bond",
            [classes.center]: type === "focus",
            [classes.bottom]: type === "work",
          })}
          disabled
        >
          {type === "bond" && (
            <LooksOneIcon className={classes.icon} fontSize="small" />
          )}
          {type === "focus" && (
            <LooksTwoIcon className={classes.icon} fontSize="small" />
          )}
          {type === "work" && (
            <Looks3Icon className={classes.icon} fontSize="small" />
          )}
        </IconButton>
      </Box>
      <Box py={1} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <div
          className={clsx(classes.typography, classes.gradient, {
            [classes.top]: type === "bond",
            [classes.center]: type === "focus",
            [classes.bottom]: type === "work",
          })}
        >
          {type === "bond" && t("index:timeline.bond")}
          {type === "focus" && t("index:timeline.focus")}
          {type === "work" && t("index:timeline.work")}
        </div>
      </Box>
    </>
  );
}
