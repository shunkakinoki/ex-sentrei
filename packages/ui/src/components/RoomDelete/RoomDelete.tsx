import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Room from "@sentrei/types/models/Room";
import GridSettings from "@sentrei/ui/components/GridSettings";
import RoomFormDelete from "@sentrei/ui/components/RoomFormDelete";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  namespaceId: string;
}

export default function RoomDelete({roomId, namespaceId}: Props): JSX.Element {
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return (
      <GridSettings skeleton tabRoomKey="delete" type="room">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (room === null) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings
      namespaceId={namespaceId}
      roomId={roomId}
      tabRoomKey="delete"
      type="room"
    >
      <RoomFormDelete roomId={roomId} namespaceId={namespaceId} />
    </GridSettings>
  );
}
