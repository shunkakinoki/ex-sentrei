import * as React from "react";

import {getMember} from "@sentrei/common/firebase/members";
import {getRoom} from "@sentrei/common/firebase/rooms";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import GridSettings from "@sentrei/ui/components/GridSettings";
import RoomColorBoard from "@sentrei/ui/components/RoomColorBoard";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  roomId: string;
  namespaceId: string;
  nameroomId: string;
  user: User.Get;
  profile: Profile.Get;
  spaceId: string;
}

export default function RoomColor({
  roomId,
  namespaceId,
  nameroomId,
  user,
  profile,
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
      <GridSettings skeleton tabRoomKey="color" model="room">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!room || !member) {
    return <ErrorScreen />;
  }

  return (
    <GridSettings
      namespaceId={namespaceId}
      nameroomId={nameroomId}
      tabRoomKey="color"
      model="room"
    >
      <RoomColorBoard room={room} user={user} profile={profile} />
    </GridSettings>
  );
}
