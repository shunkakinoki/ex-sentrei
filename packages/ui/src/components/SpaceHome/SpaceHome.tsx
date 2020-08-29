import Box from "@material-ui/core/Box";

import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SpaceHomeBoard from "@sentrei/ui/components/SpaceHomeBoard";
import SpacePanel from "@sentrei/ui/components/SpacePanel";

export interface Props {
  member: Member.Get;
  members: Member.Get[];
  profile: Profile.Get;
  rooms: Room.Get[] | null;
  space: Space.Get;
  user: User.Get;
}

export default function SpaceHome({
  rooms,
  profile,
  member,
  members,
  space,
  user,
}: Props): JSX.Element {
  return (
    <>
      <Box py={2} />
      <SpacePanel member={member} profile={profile} space={space} user={user} />
      <Box py={2} />
      <SpaceHomeBoard
        members={members}
        profile={profile}
        rooms={rooms}
        space={space}
        user={user}
      />
    </>
  );
}
