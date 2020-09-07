import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

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

  if (!user && typeof window !== "undefined") {
    setTimeout(() => {
      Router.pushI18n("/");
    }, 3000);
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
