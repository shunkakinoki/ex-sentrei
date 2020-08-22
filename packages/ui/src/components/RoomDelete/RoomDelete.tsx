import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Room from "@sentrei/types/models/Room";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomDeleteForm from "@sentrei/ui/components/RoomDeleteForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  spaceId: string;
}

export default function RoomDelete({roomId, spaceId}: Props): JSX.Element {
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
        icon={<DeleteForeverIcon />}
        title={t("room:room.deleteRoom")}
        size="md"
      />
      <RoomDeleteForm roomId={roomId} spaceId={spaceId} />
    </>
  );
}
