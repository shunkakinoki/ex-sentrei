import Error from "next/error";
import * as React from "react";

import {getLeaderboardLive} from "@sentrei/common/firebase/leaderboard";
import Member from "@sentrei/types/models/Member";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceLeaderboardBoard from "@sentrei/ui/components/SpaceLeaderboardBoard";

export interface Props {
  membersData: Member.Get[];
  spaceId: string;
}

export default function SpaceMember({
  membersData,
  spaceId,
}: Props): JSX.Element {
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );

  React.useEffect(() => {
    const unsubscribe = getLeaderboardLive(spaceId, snap => {
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
    return <Error statusCode={404} />;
  }

  return <SpaceLeaderboardBoard members={members} />;
}
