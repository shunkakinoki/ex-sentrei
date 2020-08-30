import Container from "@material-ui/core/Container";
import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PeopleIcon from "@material-ui/icons/People";
import PollIcon from "@material-ui/icons/Poll";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {AppSpaceTabKey} from "@sentrei/types/models/AppTab";

import MuiTab from "@sentrei/ui/components/MuiTab";

import AppSpaceTabStyles from "./AppSpaceTabStyles";

interface Props {
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
  // eslint-disable-next-line react/require-default-props
  spaceId?: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppSpaceTabKey;
}

const TabMap = {
  dashboard: 0,
  rooms: 1,
  activity: 2,
  analytics: 3,
  leaderboard: 4,
  members: 5,
  settings: 6,
};

interface SkeletonAppTabIconProps {
  label: string;
  labelIcon: JSX.Element;
}

interface MuiAppTabIconProps extends SkeletonAppTabIconProps {
  href: string;
  as: string;
}

interface AppTabIconProps extends MuiAppTabIconProps {
  skeleton: boolean;
}

export default function AppSpaceTab({
  skeleton = false,
  spaceId,
  tabKey = "dashboard",
}: Props): JSX.Element {
  const classes = AppSpaceTabStyles();
  const {t} = useTranslation();

  const SkeletonAppTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
      },
      selected: {},
    }),
  )((props: SkeletonAppTabIconProps) => (
    <Tab
      {...props}
      label={
        <div>
          <span className={classes.labelIcon}>{props.labelIcon}</span>{" "}
          {props.label}
        </div>
      }
    />
  ));

  const MuiAppTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
        "&:hover": {
          color: theme.palette.primary.main,
          opacity: 1,
        },
        "&$selected": {
          color: theme.palette.primary.main,
        },
        "&:focus": {
          color: theme.palette.primary.main,
        },
      },
      selected: {},
    }),
  )((props: MuiAppTabIconProps) => (
    <MuiTab
      {...props}
      label={
        <div>
          <span className={classes.labelIcon}>{props.labelIcon}</span>{" "}
          {props.label}
        </div>
      }
    />
  ));

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Tabs
          value={TabMap[tabKey]}
          aria-label="appTab"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.home")}
              labelIcon={<HomeIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]"
              as={`/${spaceId}`}
              label={t("common:common.home")}
              labelIcon={<HomeIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.rooms")}
              labelIcon={<MeetingRoomIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/rooms"
              as={`/${spaceId}/rooms`}
              label={t("common:common.rooms")}
              labelIcon={<MeetingRoomIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.activity")}
              labelIcon={<HistoryIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/activity"
              as={`/${spaceId}/activity`}
              label={t("common:common.activity")}
              labelIcon={<HistoryIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.analytics")}
              labelIcon={<PollIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/analytics"
              as={`/${spaceId}/analytics`}
              label={t("common:common.analytics")}
              labelIcon={<PollIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.leaderboard")}
              labelIcon={<FormatListNumberedIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/leaderboard"
              as={`/${spaceId}/leaderboard`}
              label={t("common:common.leaderboard")}
              labelIcon={<FormatListNumberedIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.members")}
              labelIcon={<PeopleIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/members"
              as={`/${spaceId}/members`}
              label={t("common:common.members")}
              labelIcon={<PeopleIcon />}
            />
          )}
          {skeleton ? (
            <SkeletonAppTabIcon
              label={t("common:common.settings")}
              labelIcon={<SettingsIcon />}
            />
          ) : (
            <MuiAppTabIcon
              href="/[spaceId]/settings"
              as={`/${spaceId}/settings`}
              label={t("common:common.settings")}
              labelIcon={<SettingsIcon />}
            />
          )}
        </Tabs>
      </Container>
    </div>
  );
}
