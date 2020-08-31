import Error from "next/error";
import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import Member from "@sentrei/types/models/Member";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceMemberBoard from "@sentrei/ui/components/SpaceMemberBoard";

export interface Props {
  membersData: Member.Get[];
  namespaceId: string;
  userId: string;
}

export default function SpaceMember({
  membersData,
  namespaceId,
  userId,
}: Props): JSX.Element {
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );

  React.useEffect(() => {
    const unsubscribe = getMembersLive(namespaceId, snap => {
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [namespaceId]);

  if (members === undefined) {
    return <SkeletonList />;
  }

  if (members === null) {
    return <Error statusCode={404} />;
  }

  return <SpaceMemberBoard members={members} userId={userId} />;
}
