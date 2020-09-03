import Error from "next/error";
import * as React from "react";

import {getMembers} from "@sentrei/common/firebase/members";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceFormSettings from "@sentrei/ui/components/SpaceFormSettings";

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
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    try {
      getMembers({spaceId}).then(setMembers);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [spaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="general" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="general" type="space">
      <SpaceFormSettings
        role={members?.filter(doc => doc.uid === user.uid)[0].role || "viewer"}
        profile={profile}
        user={user}
        space={space}
      />
    </GridSettings>
  );
}
