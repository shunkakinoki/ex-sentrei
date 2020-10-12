import ButtonGroup from "@material-ui/core/ButtonGroup";

import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import {SettingsRoomTabKey} from "@sentrei/types/models/SettingsTab";
import GridSettingsButton from "@sentrei/ui/components/GridSettingsButton";

import GridSettingsRoomButtonStyles from "./GridSettingsRoomButtonStyles";

const TabMap = {
  general: 0,
  color: 1,
  quit: 2,
  delete: 3,
};

export interface Props {
  namespaceId?: string;
  nameroomId?: string;
  skeleton?: boolean;
  tabKey: SettingsRoomTabKey;
}
export default function GridSettingsRoomTab({
  namespaceId,
  nameroomId,
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
        href="/[namespaceId]/[nameroomId]/settings"
        as={`/${namespaceId}/${nameroomId}/settings`}
        selected={value === 0}
        skeleton={skeleton}
      >
        {t("common:common.general")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/[nameroomId]/settings/color"
        as={`/${namespaceId}/${nameroomId}/settings/color`}
        selected={value === 1}
        skeleton={skeleton}
      >
        {t("common:common.color")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/[nameroomId]/settings/quit"
        as={`/${namespaceId}/${nameroomId}/settings/quit`}
        selected={value === 2}
        skeleton={skeleton}
      >
        {t("common:common.quit")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/[nameroomId]/settings/delete"
        as={`/${namespaceId}/${nameroomId}/settings/delete`}
        selected={value === 3}
        skeleton={skeleton}
      >
        {t("common:common.delete")}
      </GridSettingsButton>
    </ButtonGroup>
  );
}
