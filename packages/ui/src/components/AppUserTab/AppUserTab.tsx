import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import CreateIcon from "@material-ui/icons/Create";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {AppUserTabKey} from "@sentrei/types/models/AppTab";
import AppTabIcon from "@sentrei/ui/components/AppTabIcon";

import AppUserTabStyles from "./AppUserTabStyles";

interface Props {
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppUserTabKey;
}

const TabMap = {
  dashboard: 0,
  create: 1,
  profile: 2,
  notifications: 3,
  settings: 4,
};

export default function AppUserTab({
  skeleton = false,
  tabKey = "dashboard",
}: Props): JSX.Element {
  const classes = AppUserTabStyles();
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
            href="/dashboard"
            label={t("common:common.dashboard")}
            labelIcon={<DashboardIcon />}
            selected={value === 0}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/create"
            label={t("common:common.create")}
            labelIcon={<CreateIcon />}
            selected={value === 1}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/profile"
            label={t("common:common.profile")}
            labelIcon={<PersonIcon />}
            selected={value === 2}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/notifications"
            label={t("common:common.notifications")}
            labelIcon={<NotificationsIcon />}
            selected={value === 3}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/settings"
            label={t("common:common.settings")}
            labelIcon={<SettingsIcon />}
            selected={value === 4}
            skeleton={skeleton}
          />
        </Tabs>
      </Container>
    </div>
  );
}
