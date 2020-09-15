import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";

import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomFormId from "@sentrei/ui/components/RoomFormId";
import RoomFormName from "@sentrei/ui/components/RoomFormName";
import RoomFormType from "@sentrei/ui/components/RoomFormType";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  role: Member.Role;
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
  spaceId: string;
  namespaceId: string;
}

const RoomSettingsBoard = ({
  role,
  profile,
  room,
  user,
  spaceId,
  namespaceId,
}: Props): JSX.Element => {
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
        tabIconOne={<AssignmentIndIcon />}
        tabIconTwo={<DescriptionIcon />}
        tabIconThree={<CategoryIcon />}
        tabLabelOne={t("common:common.name")}
        tabLabelTwo={t("common:common.id")}
        tabLabelThree={t("common:common.type")}
        tabPanelOne={
          <RoomFormName
            disabled={role !== "admin"}
            profile={profile}
            room={room}
            user={user}
          />
        }
        tabPanelTwo={
          <RoomFormId
            disabled={role !== "admin"}
            room={room}
            spaceId={spaceId}
            namespaceId={namespaceId}
          />
        }
        tabPanelThree={
          <RoomFormType
            disabled={role !== "admin"}
            profile={profile}
            room={room}
            user={user}
          />
        }
      />
    </>
  );
};

export default RoomSettingsBoard;
