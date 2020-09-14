import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceFormId from "@sentrei/ui/components/SpaceFormId";
import SpaceFormName from "@sentrei/ui/components/SpaceFormName";
import SpaceFormPhoto from "@sentrei/ui/components/SpaceFormPhoto";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  role: Member.Role;
  profile: Profile.Get;
  space: Space.Get;
  user: User.Get;
}

const SpaceSettingsBoard = ({
  role,
  profile,
  space,
  user,
}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("space:settings.general")}
        size="md"
      />
      <TabBoard
        tabIconOne={<AssignmentIndIcon />}
        tabIconTwo={<PhotoIcon />}
        tabIconThree={<DescriptionIcon />}
        tabLabelOne={t("common:common.name")}
        tabLabelTwo={t("common:common.photo")}
        tabLabelThree={t("common:common.id")}
        tabPanelOne={
          <SpaceFormName
            disabled={role !== "admin"}
            profile={profile}
            space={space}
            user={user}
          />
        }
        tabPanelTwo={
          <SpaceFormPhoto disabled profile={profile} space={space} />
        }
        tabPanelThree={
          <SpaceFormId disabled={role !== "admin"} space={space} />
        }
      />
    </>
  );
};

export default SpaceSettingsBoard;
