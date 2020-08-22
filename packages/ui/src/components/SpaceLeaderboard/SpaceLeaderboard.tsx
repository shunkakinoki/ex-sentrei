import Error from "next/error";
import * as React from "react";

import {getLeaderboardsSnapshot} from "@sentrei/common/firebase/leaderboard";
import Leaderboard from "@sentrei/types/models/Leaderboard";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceLeaderboardList from "@sentrei/ui/components/SpaceLeaderboardList";

export interface Props {
  spaceId: string;
}

export default function SpaceLeaderboard({spaceId}: Props): JSX.Element {
  const [leaderboardShot, setLeaderboardShot] = React.useState<
    Leaderboard.Snapshot[]
  >();

  React.useEffect(() => {
    getLeaderboardsSnapshot({spaceId}).then(setLeaderboardShot);
  }, [spaceId]);

  if (leaderboardShot === undefined) {
    return <SkeletonList />;
  }

  if (leaderboardShot === null) {
    return <Error statusCode={404} />;
  }

  return (
    <SpaceLeaderboardList
      leaderboardShot={leaderboardShot}
      last={leaderboardShot[leaderboardShot.length - 1]?.snap || 0}
      spaceId={spaceId}
    />
  );
}
