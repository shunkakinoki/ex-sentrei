import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpacePanelAccordion from "@sentrei/ui/components/SpacePanelAccordion";
import SpacePanelBanner from "@sentrei/ui/components/SpacePanelBanner";
import SpacePanelStatus from "@sentrei/ui/components/SpacePanelStatus";

export interface Props {
  photo?: string | null;
  member: Member.Get;
  name: string;
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpacePanel({
  member,
  name,
  profile,
  photo,
  spaceId,
  user,
}: Props): JSX.Element {
  return (
    <>
      <SpacePanelBanner photo={photo} name={name} />
      <SpacePanelStatus
        profile={profile}
        member={member}
        spaceId={spaceId}
        user={user}
      />
      <SpacePanelAccordion spaceId={spaceId} />
    </>
  );
}
