import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
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

  if (!user) {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile) {
    return <Loader />;
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
        />
      )}
      {user ? <NotificationScreen user={user} /> : <SkeletonScreen />}
    </>
  );
};

export default Notifications;
