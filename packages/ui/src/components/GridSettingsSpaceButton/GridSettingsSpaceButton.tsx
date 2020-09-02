import ButtonGroup from "@material-ui/core/ButtonGroup";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {SettingsSpaceTabKey} from "@sentrei/types/models/SettingsTab";
import GridSettingsButton from "@sentrei/ui/components/GridSettingsButton";

import GridSettingsSpaceTabStyles from "./GridSettingsSpaceButtonStyles";

const TabMap = {
  general: 0,
  billing: 1,
  invite: 2,
  quit: 3,
};

export interface Props {
  namespaceId?: string;
  skeleton?: boolean;
  tabKey: SettingsSpaceTabKey;
}
export default function GridSettingsSpaceTab({
  namespaceId,
  skeleton = false,
  tabKey,
}: Props): JSX.Element {
  const classes = GridSettingsSpaceTabStyles();
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
        href="/[namespaceId]/settings"
        as={`/${namespaceId}/settings`}
        selected={value === 0}
        skeleton={skeleton}
      >
        {t("common:common.general")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/settings/billing"
        as={`/${namespaceId}/settings/billing`}
        selected={value === 1}
        skeleton={skeleton}
      >
        {t("common:common.billing")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/settings/invite"
        as={`/${namespaceId}/settings/invite`}
        selected={value === 2}
        skeleton={skeleton}
      >
        {t("common:common.invite")}
      </GridSettingsButton>
      <GridSettingsButton
        href="/[namespaceId]/settings/quit"
        as={`/${namespaceId}/settings/quit`}
        selected={value === 3}
        skeleton={skeleton}
      >
        {t("common:common.quit")}
      </GridSettingsButton>
    </ButtonGroup>
  );
}
