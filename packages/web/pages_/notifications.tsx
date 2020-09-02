import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const NotificationScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/NotificationScreen");
  },
  {ssr: false},
);

const Notifications: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("notifications");
  }, []);

  if (!user && typeof window !== "undefined") {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="notifications" type="user" />
        <SkeletonForm />
      </>
    );
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          tabUserKey="notifications"
          type="user"
        />
      )}
      {user && <NotificationScreen user={user} />}
    </>
  );
};

export default Notifications;
