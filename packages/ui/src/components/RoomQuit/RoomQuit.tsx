import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import RoomFormQuit from "@sentrei/ui/components/RoomFormQuit";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  namespaceId: string;
  roomId: string;
  user: User.Get;
}

export default function RoomQuit({
  namespaceId,
  roomId,
  user,
}: Props): JSX.Element {
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="quit" type="room">
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
      tabRoomKey="quit"
      type="room"
    >
      <RoomFormQuit
        namespaceId={namespaceId}
        roomId={roomId}
        userId={user.uid}
      />
    </GridSettings>
  );
}
