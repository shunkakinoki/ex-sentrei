import Tabs from "@material-ui/core/Tabs";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {SettingsSpaceTabKey} from "@sentrei/types/models/SettingsTab";
import GridSettingsTab from "@sentrei/ui/components/GridSettingsTab";

import GridSettingsSpaceTabStyles from "./GridSettingsSpaceTabStyles";

const TabMap = {
  general: 0,
  billing: 1,
  invite: 2,
  quit: 3,
};

export interface Props {
  spaceId?: string;
  skeleton?: boolean;
  tabKey: SettingsSpaceTabKey;
}
export default function GridSettingsSpaceTab({
  spaceId,
  skeleton = false,
  tabKey,
}: Props): JSX.Element {
  const classes = GridSettingsSpaceTabStyles();
  const {t} = useTranslation();
  const value = TabMap[tabKey];

  return (
    <Tabs
      orientation="vertical"
      aria-label="spaceSettingsButton"
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.tabs}
      value={value}
    >
      <GridSettingsTab
        href="/[spaceId]/settings"
        as={`/${spaceId}/settings`}
        label={t("common:common.general")}
        selected={value === 0}
        skeleton={skeleton}
      />
      <GridSettingsTab
        href="/[spaceId]/settings/billing"
        as={`/${spaceId}/settings/billing`}
        label={t("common:common.billing")}
        selected={value === 1}
        skeleton={skeleton}
      />
      <GridSettingsTab
        href="/[spaceId]/settings/invite"
        as={`/${spaceId}/settings/invite`}
        label={t("common:common.invite")}
        selected={value === 2}
        skeleton={skeleton}
      />
      <GridSettingsTab
        href="/[spaceId]/settings/quit"
        as={`/${spaceId}/settings/quit`}
        label={t("common:common.quit")}
        selected={value === 3}
        skeleton={skeleton}
      />
    </Tabs>
  );
}
