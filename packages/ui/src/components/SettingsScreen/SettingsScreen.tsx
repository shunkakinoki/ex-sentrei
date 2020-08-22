import Grid from "@material-ui/core/Grid";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockIcon from "@material-ui/icons/Lock";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import SettingsNotificationForm from "@sentrei/ui/components/SettingsNotificationForm";
import SettingsOtherForm from "@sentrei/ui/components/SettingsOtherForm";
import SettingsPasswordForm from "@sentrei/ui/components/SettingsPasswordForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const SettingsScreen = ({profile, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("settings:settings.title")}
        size="md"
      />
      <TabBoard
        size="sm"
        tabIconOne={<AssignmentIndIcon />}
        tabIconTwo={<NotificationsIcon />}
        tabIconThree={<LockIcon />}
        tabLabelOne={t("common:common.notifications")}
        tabLabelTwo={t("common:common.password")}
        tabLabelThree={t("common:common.other")}
        tabPanelOne={
          <Grid container justify="center" direction="row" spacing={3}>
            <Grid item xs={12}>
              <SettingsNotificationForm
                profile={profile}
                user={user}
                content="chat"
                label="Chat"
              />
            </Grid>
            <Grid item xs={12}>
              <SettingsNotificationForm
                profile={profile}
                user={user}
                content="invitation"
                label="Invitation"
              />
            </Grid>
            <Grid item xs={12}>
              <SettingsNotificationForm
                profile={profile}
                user={user}
                content="update"
                label="Update"
              />
            </Grid>
          </Grid>
        }
        tabPanelTwo={<SettingsPasswordForm />}
        tabPanelThree={<SettingsOtherForm />}
      />
    </>
  );
};

export default SettingsScreen;
