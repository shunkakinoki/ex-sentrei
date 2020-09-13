import {NextPage} from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
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

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabUserKey="notifications"
          model="user"
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="notifications" model="user" />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <SentreiAppHeader
        notificationCount={Number(user.notificationCount)}
        profile={profile}
        userId={user.uid}
        tabUserKey="notifications"
        model="user"
      />
      <NotificationScreen user={user} />
    </>
  );
};

export default Notifications;
