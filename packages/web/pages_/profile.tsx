import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import ProfileScreen from "@sentrei/ui/components/ProfileScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Profile: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (!user && typeof window !== "undefined") {
    setTimeout(() => {
      Router.pushI18n("/");
    }, 3000);
  }

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="profile" type="user" />
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
          tabUserKey="profile"
          type="user"
        />
      )}
      {user && <ProfileScreen profile={profile} user={user} />}
    </>
  );
};

export default Profile;
