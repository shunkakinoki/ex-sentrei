import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceDashboard = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceDashboard");
  },
  {ssr: false},
);

const Dashboard: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (!user && typeof window !== "undefined") {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="dashboard" type="user" />
        <SkeletonScreen />
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
          tabUserKey="dashboard"
          type="user"
        />
      )}
      {user && <SpaceDashboard userId={user.uid} />}
    </>
  );
};

export default Dashboard;
