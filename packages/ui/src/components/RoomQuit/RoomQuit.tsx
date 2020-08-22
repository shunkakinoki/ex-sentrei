import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomQuitForm from "@sentrei/ui/components/RoomQuitForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  user: User.Get;
  spaceId: string;
}

export default function RoomQuit({roomId, user, spaceId}: Props): JSX.Element {
  const {t} = useTranslation();

  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return <SkeletonForm />;
  }

  if (room === null) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <FormSection
        icon={<ExitToAppIcon />}
        title={t("room:room.quitRoom")}
        size="md"
      />
      <RoomQuitForm roomId={roomId} userId={user.uid} spaceId={spaceId} />
    </>
  );
}
