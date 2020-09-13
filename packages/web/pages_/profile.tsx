import {NextPage} from "next";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import HomeScreen from "@sentrei/ui/components/HomeScreen";
import ProfileScreen from "@sentrei/ui/components/ProfileScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Profile: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabUserKey="profile"
          model="user"
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="profile" model="user" />
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
        tabUserKey="profile"
        model="user"
      />
      <ProfileScreen profile={profile} user={user} />
    </>
  );
};

export default Profile;
