import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";

import ProfileEdit from "@sentrei/ui/components/ProfileEdit";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Profile: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("profile");
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
      {user && <ProfileEdit profile={profile} user={user} />}
    </>
  );
};

export default Profile;
