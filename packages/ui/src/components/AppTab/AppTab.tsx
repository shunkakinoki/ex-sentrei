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

import {AppTabKey} from "@sentrei/types/models/AppTab";
import AppTabIcon from "@sentrei/ui/components/AppTabIcon";

import AppTabStyles from "./AppTabStyles";

interface Props {
  spaceId: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppTabKey;
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

export default function AppTab({
  spaceId,
  tabKey = "dashboard",
}: Props): JSX.Element {
  const classes = AppTabStyles();
  const {t} = useTranslation();

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
          <AppTabIcon
            href="/[spaceId]"
            as={`/${spaceId}`}
            label={t("common:common.home")}
            labelIcon={<HomeIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/rooms"
            as={`/${spaceId}/rooms`}
            label={t("common:common.rooms")}
            labelIcon={<MeetingRoomIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/activity"
            as={`/${spaceId}/activity`}
            label={t("common:common.activity")}
            labelIcon={<HistoryIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/analytics"
            as={`/${spaceId}/analytics`}
            label={t("common:common.analytics")}
            labelIcon={<PollIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/leaderboard"
            as={`/${spaceId}/leaderboard`}
            label={t("common:common.leaderboard")}
            labelIcon={<FormatListNumberedIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/members"
            as={`/${spaceId}/members`}
            label={t("common:common.members")}
            labelIcon={<PeopleIcon />}
          />
          <AppTabIcon
            href="/[spaceId]/settings"
            as={`/${spaceId}/settings`}
            label={t("common:common.settings")}
            labelIcon={<SettingsIcon />}
          />
        </Tabs>
      </Container>
    </div>
  );
}
