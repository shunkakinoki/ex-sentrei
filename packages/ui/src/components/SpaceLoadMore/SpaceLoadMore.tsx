import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import {getSpacesSnapshot} from "@sentrei/common/firebase/spaces";
import Space from "@sentrei/types/models/Space";
import LoadMore from "@sentrei/ui/components/LoadMore";

export interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  userId?: string;
  onLoadMore: (posts: Space.Get[]) => void;
}

export default function SpaceLoadMore({
  lastItem,
  length,
  limit,
  userId,
  onLoadMore,
}: Props): JSX.Element {
  return (
    <Container maxWidth="xs" component="main">
      <Box p={3}>
        <LoadMore<Space.Snapshot>
          lastPath={lastItem}
          length={length}
          limit={limit}
          onLoadMore={onLoadMore}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request={(last: any): Promise<Space.Snapshot[]> =>
            getSpacesSnapshot({last, limit, userId})
          }
        />
      </Box>
    </Container>
  );
}
