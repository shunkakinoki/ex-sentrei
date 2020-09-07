import Error from "next/error";
import * as React from "react";

import {getMember} from "@sentrei/common/firebase/members";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceSettingsBoard from "@sentrei/ui/components/SpaceSettingsBoard";

export interface Props {
  profile: Profile.Get;
  namespaceId: string;
  spaceId: string;
  user: User.Get;
}

export default function SpaceSettings({
  profile,
  namespaceId,
  spaceId,
  user,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [member, setMember] = React.useState<Member.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    getMember(spaceId, user.uid).then(setMember);
  }, [spaceId, user.uid]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="general" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="general" type="space">
      <SpaceSettingsBoard
        role={member?.role || "viewer"}
        profile={profile}
        user={user}
        space={space}
      />
    </GridSettings>
  );
}
