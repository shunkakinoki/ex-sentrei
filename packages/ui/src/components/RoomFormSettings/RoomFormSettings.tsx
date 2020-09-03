import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomFormDescription from "@sentrei/ui/components/RoomFormDescription";
import RoomFormName from "@sentrei/ui/components/RoomFormName";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomFormSettings = ({profile, room, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("room:room.editRoom")}
        size="md"
      />
      <TabBoard
        size="sm"
        tabIconOne={<DescriptionIcon />}
        tabIconTwo={<AssignmentIndIcon />}
        tabIconThree={<PhotoIcon />}
        tabLabelOne={t("common:common.description")}
        tabLabelTwo={t("common:common.name")}
        tabLabelThree={t("common:common.photo")}
        tabPanelOne={
          <RoomFormDescription profile={profile} room={room} user={user} />
        }
        tabPanelTwo={<RoomFormName profile={profile} room={room} user={user} />}
        tabPanelThree={<></>}
      />
    </>
  );
};

export default RoomFormSettings;
