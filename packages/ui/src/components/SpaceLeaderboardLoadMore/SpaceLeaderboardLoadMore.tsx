import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import {getLeaderboardsSnapshot} from "@sentrei/common/firebase/leaderboard";
import Leaderboard from "@sentrei/types/models/Leaderboard";
import LoadMore from "@sentrei/ui/components/LoadMore";

export interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  spaceId: string;
  onLoadMore: (posts: Leaderboard.Get[]) => void;
}

export default function SpaceLeaderboardLoadMore({
  lastItem,
  length,
  limit,
  spaceId,
  onLoadMore,
}: Props): JSX.Element {
  return (
    <Container maxWidth="xs" component="main">
      <Box p={3}>
        <LoadMore<Leaderboard.Snapshot>
          lastPath={lastItem}
          length={length}
          limit={limit}
          onLoadMore={onLoadMore}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request={(last: any): Promise<Leaderboard.Snapshot[]> =>
            getLeaderboardsSnapshot({last, limit, spaceId})
          }
        />
      </Box>
    </Container>
  );
}
