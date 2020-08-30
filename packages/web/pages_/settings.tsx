import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import SettingsScreen from "@sentrei/ui/components/SettingsScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Settings: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("settings");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
        />
      ) : (
        <SentreiAppHeader />
      )}
      {user && profile && <SettingsScreen user={user} profile={profile} />}
    </>
  );
};

export default Settings;
