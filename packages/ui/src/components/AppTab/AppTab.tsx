import Container from "@material-ui/core/Container";
import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {AppTabKey} from "@sentrei/types/models/AppTab";
import MuiTab from "@sentrei/ui/components/MuiTab";

import AppTabStyles from "./AppTabStyles";

interface Props {
  spaceId: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppTabKey;
}

interface SpaceTabProps {
  href: string;
  as: string;
  label: string;
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

const SpaceTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(1),
      "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      "&$selected": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        color: theme.palette.primary.main,
      },
    },
    selected: {},
  }),
)((props: SpaceTabProps) => <MuiTab {...props} />);

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
          <SpaceTab
            href="/[spaceId]"
            as={`/${spaceId}`}
            label={t("common:common.dashboard")}
          />
          <SpaceTab
            href="/[spaceId]"
            as={`/${spaceId}`}
            label={t("common:common.rooms")}
          />
          <SpaceTab
            href="/[spaceId]/activity"
            as={`/${spaceId}/activity`}
            label={t("common:common.activity")}
          />
          <SpaceTab
            href="/[spaceId]/analytics"
            as={`/${spaceId}/analytics`}
            label={t("common:common.analytics")}
          />
          <SpaceTab
            href="/[spaceId]/leaderboard"
            as={`/${spaceId}/leaderboard`}
            label={t("common:common.leaderboard")}
          />
          <SpaceTab
            href="/[spaceId]/members"
            as={`/${spaceId}/members`}
            label={t("common:common.members")}
          />
          <SpaceTab
            href="/[spaceId]/settings"
            as={`/${spaceId}/settings`}
            label={t("common:common.settings")}
          />
        </Tabs>
      </Container>
    </div>
  );
}
