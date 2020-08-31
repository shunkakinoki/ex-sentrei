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
        href="/[spaceId]/settings"
        as={`/${spaceId}/settings`}
        label={t("common:common.general")}
        selected={value === 0}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[spaceId]/settings/billing"
        as={`/${spaceId}/settings/billing`}
        label={t("common:common.billing")}
        selected={value === 1}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[spaceId]/settings/invite"
        as={`/${spaceId}/settings/invite`}
        label={t("common:common.invite")}
        selected={value === 2}
        skeleton={skeleton}
      />
      <GridTabIcon
        href="/[spaceId]/settings/quit"
        as={`/${spaceId}/settings/quit`}
        label={t("common:common.quit")}
        selected={value === 3}
        skeleton={skeleton}
      />
    </StyledTabs>
  );
}
