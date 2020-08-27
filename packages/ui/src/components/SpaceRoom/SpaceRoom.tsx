import Error from "next/error";
import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomsLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceRoomList from "@sentrei/ui/components/SpaceRoomList";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  membersData: Member.Get[];
  roomsData: Room.Get[] | null;
  spaceData: Space.Get;
  spaceId: string;
}

export default function SpaceRoom({
  user,
  profile,
  membersData,
  roomsData,
  spaceData,
  spaceId,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>(
    spaceData,
  );

  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );
  const [rooms, setRooms] = React.useState<Room.Get[] | null | undefined>(
    roomsData,
  );

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getMembersLive(spaceId, snap => {
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId, profile]);

  React.useEffect(() => {
    const unsubscribe = getRoomsLive(spaceId, snap => {
      setRooms(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {space && members && (
        <SpaceRoomList
          members={members}
          profile={profile}
          rooms={rooms}
          space={space}
          user={user}
        />
      )}
    </>
  );
}
