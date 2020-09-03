import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Room from "@sentrei/types/models/Room";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomFormDelete from "@sentrei/ui/components/RoomFormDelete";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  namespaceId: string;
}

export default function RoomDelete({roomId, namespaceId}: Props): JSX.Element {
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
      <RoomFormDelete roomId={roomId} namespaceId={namespaceId} />
    </>
  );
}
