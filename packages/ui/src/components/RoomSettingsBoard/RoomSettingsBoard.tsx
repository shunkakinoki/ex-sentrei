import DescriptionIcon from "@material-ui/icons/Description";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomFormName from "@sentrei/ui/components/RoomFormName";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  role: Member.Role;
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomSettingsBoard = ({role, profile, room, user}: Props): JSX.Element => {
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
        tabIconTwo={<PhotoIcon />}
        tabIconThree={<EditAttributesIcon />}
        tabLabelOne={t("common:common.name")}
        tabLabelTwo={t("common:common.photo")}
        tabLabelThree={t("common:common.type")}
        tabPanelOne={
          <RoomFormName
            disabled={role !== "admin"}
            profile={profile}
            room={room}
            user={user}
          />
        }
        tabPanelTwo={<></>}
        tabPanelThree={<></>}
      />
    </>
  );
};

export default RoomSettingsBoard;
