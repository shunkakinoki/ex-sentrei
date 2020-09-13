import {NextPage} from "next";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SettingsScreen from "@sentrei/ui/components/SettingsScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Settings: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabUserKey="settings"
          model="user"
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="settings" model="user" />
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
        tabUserKey="settings"
        model="user"
      />
      <SettingsScreen user={user} profile={profile} />
    </>
  );
};

export default Settings;
