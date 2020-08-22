/* eslint-disable @typescript-eslint/no-unused-vars */

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  space: Space.Get;
  user: User.Get;
}

const SpaceSettingsForm = ({profile, space, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("space:settings.title")}
        size="md"
      />
      <TabBoard
        tabIconOne={<AccountBalanceIcon />}
        tabIconTwo={<MeetingRoomIcon />}
        tabIconThree={<DashboardIcon />}
        tabLabelOne={t("common:common.billing")}
        tabLabelTwo={t("common:common.room")}
        tabLabelThree={t("common:common.space")}
        tabPanelOne={
          <Container component="main" maxWidth="xs">
            <Box />
          </Container>
        }
        tabPanelTwo={
          <Container component="main" maxWidth="xs">
            <Box />
          </Container>
        }
        tabPanelThree={
          <Container component="main" maxWidth="xs">
            <Box />
          </Container>
        }
      />
    </>
  );
};

export default SpaceSettingsForm;
