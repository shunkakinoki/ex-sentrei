import ButtonGroup from "@material-ui/core/ButtonGroup";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {SettingsRoomTabKey} from "@sentrei/types/models/SettingsTab";
import GridSettingsButton from "@sentrei/ui/components/GridSettingsButton";

import GridSettingsRoomButtonStyles from "./GridSettingsRoomButtonStyles";

const TabMap = {
  general: 0,
  quit: 1,
  delete: 2,
};

export interface Props {
  namespaceId?: string;
  roomId?: string;
  skeleton?: boolean;
  tabKey: SettingsRoomTabKey;
}
export default function GridSettingsRoomTab({
  namespaceId,
  roomId,
  skeleton = false,
  tabKey,
}: Props): JSX.Element {
  const classes = GridSettingsRoomButtonStyles();
  const {t} = useTranslation();
  const value = TabMap[tabKey];

  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical contained primary button group"
      variant="text"
      className={classes.tabs}
    >
      <GridSettingsButton
        href="/[namespaceId]/[roomId]/settings"
        as={`/${namespaceId}/${roomId}/settings`}
        selected={value === 0}
        skeleton={skeleton}
      >
        {t("common:common.general")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/[roomId]/settings/quit"
        as={`/${namespaceId}/${roomId}/settings/quit`}
        selected={value === 1}
        skeleton={skeleton}
      >
        {t("common:common.quit")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/[roomId]/settings/delete"
        as={`/${namespaceId}/${roomId}/settings/delete`}
        selected={value === 2}
        skeleton={skeleton}
      >
        {t("common:common.delete")}
      </GridSettingsButton>
    </ButtonGroup>
  );
}
