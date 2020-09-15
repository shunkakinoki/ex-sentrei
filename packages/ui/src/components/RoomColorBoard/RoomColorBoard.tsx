import Container from "@material-ui/core/Container";
import PaletteIcon from "@material-ui/icons/Palette";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomFormColor from "@sentrei/ui/components/RoomFormColor";

interface Props {
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomColorBoard = ({profile, room, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<PaletteIcon />}
        title={t("room:room.color")}
        size="md"
      />
      <Container maxWidth="xs" component="main">
        <RoomFormColor profile={profile} room={room} user={user} />
      </Container>
    </>
  );
};

export default RoomColorBoard;
