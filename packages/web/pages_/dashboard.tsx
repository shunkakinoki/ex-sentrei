import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import StatusSpace from "@sentrei/ui/components/StatusSpace";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceDashboard = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceDashboard");
  },
  {ssr: false},
);

const Dashboard: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("dashboard");
  }, []);

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton type="space" />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
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
      {user && <StatusSpace userId={user.uid} profile={profile} />}
      {user && <SpaceDashboard user={user} />}
    </>
  );
};

export default Dashboard;
