import Error from "next/error";
import * as React from "react";

import {getMember} from "@sentrei/common/firebase/members";
import {getRoom} from "@sentrei/common/firebase/rooms";
import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import RoomDeleteBoard from "@sentrei/ui/components/RoomDeleteBoard";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  nameroomId: string;
  namespaceId: string;
  user: User.Get;
  spaceId: string;
}

export default function RoomDelete({
  roomId,
  nameroomId,
  namespaceId,
  user,
  spaceId,
}: Props): JSX.Element {
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();
  const [member, setMember] = React.useState<Member.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  React.useEffect(() => {
    getMember(spaceId, user.uid).then(setMember);
  }, [spaceId, user.uid]);

  if (room === undefined) {
    return (
      <GridSettings skeleton tabRoomKey="delete" model="room">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!room) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings
      namespaceId={namespaceId}
      nameroomId={nameroomId}
      tabRoomKey="delete"
      model="room"
    >
      <RoomDeleteBoard
        role={member?.role || "viewer"}
        roomId={roomId}
        namespaceId={namespaceId}
      />
    </GridSettings>
  );
}
