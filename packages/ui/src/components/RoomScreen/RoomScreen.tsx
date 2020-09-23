import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import {recordGroup} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  roomId: string;
  spaceId: string;
}

export default function RoomScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
  profile,
  roomId,
  spaceId,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [member, setMember] = React.useState<Member.Get | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getMembersLive(spaceId, snap => {
      setMember(snap.filter(doc => doc.uid === profile.uid)[0]);
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId, profile]);

  React.useEffect(() => {
    const unsubscribe = getRoomLive(roomId, snap => {
      setRoom(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [roomId]);

  React.useEffect(() => {
    if (space) {
      recordGroup(space.id, {
        namespaceId: space.namespaceId,
        tier: space.tier,
        spaceId: space.id,
        stripeId: space.stripeId,
      });
    }
  }, [space]);

  if (
    space === undefined ||
    room === undefined ||
    members === undefined ||
    member === undefined
  ) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <ErrorScreen />;
  }

  return <></>;
}
