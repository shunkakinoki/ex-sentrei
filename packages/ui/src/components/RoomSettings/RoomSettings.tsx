import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import RoomFormSettings from "@sentrei/ui/components/RoomFormSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  profile: Profile.Get;
  roomId: string;
  namespaceId: string;
  user: User.Get;
}

export default function RoomSettings({
  profile,
  roomId,
  namespaceId,
  user,
}: Props): JSX.Element {
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="general" type="room">
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
      tabRoomKey="general"
      type="room"
    >
      <RoomFormSettings profile={profile} user={user} room={room} />
    </GridSettings>
  );
}
