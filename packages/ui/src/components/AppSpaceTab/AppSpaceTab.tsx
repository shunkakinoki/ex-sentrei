import Container from "@material-ui/core/Container";
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
import AppTabIcon from "@sentrei/ui/components/AppTabIcon";

import AppSpaceTabStyles from "./AppSpaceTabStyles";

interface Props {
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
  // eslint-disable-next-line react/require-default-props
  namespaceId?: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppSpaceTabKey;
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

export default function AppSpaceTab({
  skeleton = false,
  namespaceId,
  tabKey = "home",
}: Props): JSX.Element {
  const classes = AppSpaceTabStyles();
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
            href="/[namespaceId]"
            as={`/${namespaceId}`}
            label={t("common:common.home")}
            labelIcon={<HomeIcon />}
            selected={value === 0}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/rooms"
            as={`/${namespaceId}/rooms`}
            label={t("common:common.rooms")}
            labelIcon={<MeetingRoomIcon />}
            selected={value === 1}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/activity"
            as={`/${namespaceId}/activity`}
            label={t("common:common.activity")}
            labelIcon={<HistoryIcon />}
            selected={value === 2}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/analytics"
            as={`/${namespaceId}/analytics`}
            label={t("common:common.analytics")}
            labelIcon={<PollIcon />}
            selected={value === 3}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/leaderboard"
            as={`/${namespaceId}/leaderboard`}
            label={t("common:common.leaderboard")}
            labelIcon={<FormatListNumberedIcon />}
            selected={value === 4}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/members"
            as={`/${namespaceId}/members`}
            label={t("common:common.members")}
            labelIcon={<PeopleIcon />}
            selected={value === 5}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/settings"
            as={`/${namespaceId}/settings`}
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
