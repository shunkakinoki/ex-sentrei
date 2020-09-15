import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import Member from "@sentrei/types/models/Member";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceMemberBoard from "@sentrei/ui/components/SpaceMemberBoard";

export interface Props {
  membersData: Member.Get[];
  spaceId: string;
  userId: string;
}

export default function SpaceMember({
  membersData,
  spaceId,
  userId,
}: Props): JSX.Element {
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );

  React.useEffect(() => {
    const unsubscribe = getMembersLive(spaceId, snap => {
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (members === undefined) {
    return <SkeletonList />;
  }

  if (members === null) {
    return <ErrorScreen />;
  }

  return <SpaceMemberBoard members={members} userId={userId} />;
}
