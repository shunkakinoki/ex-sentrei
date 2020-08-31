import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/activity";
import Activity from "@sentrei/types/models/Activity";
import LoadMore from "@sentrei/ui/components/LoadMore";

export interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  spaceId: string;
  onLoadMore: (posts: Activity.Get[]) => void;
}

export default function SpaceActivityLoadMore({
  lastItem,
  length,
  limit,
  spaceId,
  onLoadMore,
}: Props): JSX.Element {
  return (
    <Container maxWidth="xs" component="main">
      <Box p={3}>
        <LoadMore<Activity.Snapshot>
          lastPath={lastItem}
          length={length}
          limit={limit}
          onLoadMore={onLoadMore}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request={(last: any): Promise<Activity.Snapshot[]> =>
            getActivitiesSnapshot({last, limit, spaceId})
          }
        />
      </Box>
    </Container>
  );
}
