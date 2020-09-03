import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import SettingsIcon from "@material-ui/icons/Settings";
import VideocamIcon from "@material-ui/icons/Videocam";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {AppTabRoomKey} from "@sentrei/types/models/AppTab";
import AppTabIcon from "@sentrei/ui/components/AppTabIcon";

import AppTabRoomStyles from "./AppTabRoomStyles";

interface Props {
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
  // eslint-disable-next-line react/require-default-props
  namespaceId?: string;
  // eslint-disable-next-line react/require-default-props
  roomId?: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppTabRoomKey;
}

const TabMap = {
  home: 0,
  settings: 1,
};

export default function AppTabRoom({
  skeleton = false,
  namespaceId,
  roomId,
  tabKey = "home",
}: Props): JSX.Element {
  const classes = AppTabRoomStyles();
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
            href="/[namespaceId]/[roomId]"
            as={`/${namespaceId}/${roomId}`}
            label={t("common:common.room")}
            labelIcon={<VideocamIcon />}
            selected={value === 0}
            skeleton={skeleton}
          />
          <AppTabIcon
            href="/[namespaceId]/[roomId]/settings"
            as={`/${namespaceId}/${roomId}/settings`}
            label={t("common:common.settings")}
            labelIcon={<SettingsIcon />}
            selected={value === 1}
            skeleton={skeleton}
          />
        </Tabs>
      </Container>
    </div>
  );
}
