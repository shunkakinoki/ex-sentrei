import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PeopleIcon from "@material-ui/icons/People";
import PollIcon from "@material-ui/icons/Poll";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-locale/useTranslation";
import React from "react";

import {AppTabSpaceKey} from "@sentrei/types/models/AppTab";
import AppTabIcon from "@sentrei/ui/components/AppTabIcon";

import AppTabSpaceStyles from "./AppTabSpaceStyles";

interface Props {
  skeleton?: boolean;
  namespaceId?: string;
  tabKey?: AppTabSpaceKey;
}

const TabMap = {
  home: 0,
  rooms: 1,
  activity: 2,
  analytics: 3,
  leaderboard: 4,
  members: 5,
  settings: 6,
};

export default function AppTabSpace({
  skeleton = false,
  namespaceId,
  tabKey = "home",
}: Props): JSX.Element {
  const classes = AppTabSpaceStyles();
  const {t} = useTranslation();
  const value = TabMap[tabKey];

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Tabs
          value={value}
          aria-label="appTab"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <AppTabIcon
            href={`/${namespaceId}`}
            label={t("common:common.home")}
            labelIcon={<HomeIcon />}
            selected={value === 0}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/rooms`}
            label={t("common:common.rooms")}
            labelIcon={<MeetingRoomIcon />}
            selected={value === 1}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/activity`}
            label={t("common:common.activity")}
            labelIcon={<HistoryIcon />}
            selected={value === 2}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/analytics`}
            label={t("common:common.analytics")}
            labelIcon={<PollIcon />}
            selected={value === 3}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/leaderboard`}
            label={t("common:common.leaderboard")}
            labelIcon={<FormatListNumberedIcon />}
            selected={value === 4}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/members`}
            label={t("common:common.members")}
            labelIcon={<PeopleIcon />}
            selected={value === 5}
            skeleton={skeleton}
          />
          <AppTabIcon
            href={`/${namespaceId}/settings`}
            label={t("common:common.settings")}
            labelIcon={<SettingsIcon />}
            selected={value === 6}
            skeleton={skeleton}
          />
        </Tabs>
      </Container>
    </div>
  );
}
