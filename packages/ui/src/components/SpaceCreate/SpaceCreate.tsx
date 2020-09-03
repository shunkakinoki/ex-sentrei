import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpaceCreateBoard from "@sentrei/ui/components/SpaceCreateBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

export default function SpaceCreate({profile, user}: Props): JSX.Element {
  return <SpaceCreateBoard profile={profile} user={user} />;
}
