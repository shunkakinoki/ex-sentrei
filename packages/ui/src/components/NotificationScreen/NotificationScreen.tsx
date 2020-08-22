import * as React from "react";

import {getNotificationsSnapshot} from "@sentrei/common/firebase/notifications";
import Notification from "@sentrei/types/models/Notification";

import User from "@sentrei/types/models/User";
import NotificationList from "@sentrei/ui/components/NotificationList";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  user: User.Get;
}

export default function NotificationScreen({user}: Props): JSX.Element {
  const [notificationShot, setNotificationShot] = React.useState<
    Notification.Snapshot[]
  >();

  React.useEffect(() => {
    if (user) {
      getNotificationsSnapshot({userId: user.uid}).then(setNotificationShot);
    }
  }, [user]);

  if (!notificationShot) return <SkeletonForm />;

  return (
    <>
      {user && (
        <NotificationList
          notificationShot={notificationShot}
          last={notificationShot[notificationShot.length - 1]?.snap || 0}
          userId={user.uid}
        />
      )}
    </>
  );
}
