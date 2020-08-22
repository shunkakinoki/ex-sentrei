import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import {getNotificationsSnapshot} from "@sentrei/common/firebase/notifications";
import Notification from "@sentrei/types/models/Notification";
import LoadMore from "@sentrei/ui/components/LoadMore";

export interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  userId: string;
  onLoadMore: (posts: Notification.Get[]) => void;
}

export default function NotificationLoadMore({
  lastItem,
  length,
  limit,
  userId,
  onLoadMore,
}: Props): JSX.Element {
  return (
    <Container maxWidth="xs" component="main">
      <Box p={3}>
        <LoadMore<Notification.Snapshot>
          lastPath={lastItem}
          length={length}
          limit={limit}
          onLoadMore={onLoadMore}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request={(last: any): Promise<Notification.Snapshot[]> =>
            getNotificationsSnapshot({last, limit, userId})
          }
        />
      </Box>
    </Container>
  );
}
