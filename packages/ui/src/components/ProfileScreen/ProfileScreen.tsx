import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import ProfileFormName from "@sentrei/ui/components/ProfileFormName";
import ProfileFormPhoto from "@sentrei/ui/components/ProfileFormPhoto";
import ProfileFormUsername from "@sentrei/ui/components/ProfileFormUsername";
import TabBoard from "@sentrei/ui/components/TabBoard";

interface Props {
  profile: Profile.Get;
  user: User.Get;
}

export default function ProfileScreen({profile, user}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("profile:profile.editProfile")}
        size="md"
      />
      <TabBoard
        size="sm"
        tabIconOne={<AssignmentIndIcon />}
        tabIconTwo={<PhotoIcon />}
        tabIconThree={<DescriptionIcon />}
        tabLabelOne={t("common:common.name")}
        tabLabelTwo={t("common:common.photo")}
        tabLabelThree={t("common:common.username")}
        tabPanelOne={<ProfileFormName profile={profile} />}
        tabPanelTwo={<ProfileFormPhoto disabled profile={profile} />}
        tabPanelThree={<ProfileFormUsername profile={profile} user={user} />}
      />
    </>
  );
}
