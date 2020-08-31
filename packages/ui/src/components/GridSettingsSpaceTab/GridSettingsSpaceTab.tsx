import {withStyles} from "@material-ui/core/styles";
import Tabs, {TabsProps} from "@material-ui/core/Tabs";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {SettingsSpaceTabKey} from "@sentrei/types/models/SettingsTab";
import GridTabIcon from "@sentrei/ui/components/GridTabIcon";

import GridSettingsSpaceTabStyles from "./GridSettingsSpaceTabStyles";

const TabMap = {
  general: 0,
  billing: 1,
  invite: 2,
  quit: 3,
};

const StyledTabs = withStyles(() => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
}))((props: TabsProps) => (
  <Tabs {...props} TabIndicatorProps={{children: <></>}} />
));

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
    <StyledTabs
      orientation="vertical"
      aria-label="spaceSettingsButton"
      indicatorColor="primary"
      textColor="primary"
      variant="standard"
      scrollButtons="off"
      className={classes.tabs}
      value={value}
    >
      <GridTabIcon
        href="/[namespaceId]/settings"
        as={`/${namespaceId}/settings`}
        label={t("common:common.general")}
        selected={value === 0}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[namespaceId]/settings/billing"
        as={`/${namespaceId}/settings/billing`}
        label={t("common:common.billing")}
        selected={value === 1}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[namespaceId]/settings/invite"
        as={`/${namespaceId}/settings/invite`}
        label={t("common:common.invite")}
        selected={value === 2}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[namespaceId]/settings/quit"
        as={`/${namespaceId}/settings/quit`}
        label={t("common:common.quit")}
        selected={value === 3}
        skeleton={skeleton}
      />
    </StyledTabs>
  );
}
