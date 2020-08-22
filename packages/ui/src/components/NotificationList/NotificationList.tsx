import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Notification from "@sentrei/types/models/Notification";

import NotificationCard from "@sentrei/ui/components/NotificationCard";
import NotificationLoadMore from "@sentrei/ui/components/NotificationLoadMore";
import NotificationNone from "@sentrei/ui/components/NotificationNone";

export interface Props {
  notificationShot: Notification.Snapshot[];
  userId: string;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}

export default function NotificationList({
  notificationShot,
  last,
  limit = 5,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [notifications, setNotifications] = React.useState<Notification.Get[]>(
    notificationShot,
  );

  if (notifications.length === 0) {
    return <NotificationNone />;
  }

  return (
    <>
      <Box mt={3} mb={6}>
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="h4"
        >
          {t("notifications:notifications.title")}
        </Typography>
      </Box>
      <Container maxWidth="md" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {notifications.map(notification => (
            <Grid item key={notification.id} xs={12}>
              <NotificationCard notification={notification} userId={userId} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <NotificationLoadMore
        lastItem={last || notifications[notifications.length - 1].id}
        length={notifications.length}
        limit={limit}
        userId={userId}
        onLoadMore={(res: Notification.Get[]): void =>
          setNotifications([...notifications, ...res])
        }
      />
    </>
  );
}
