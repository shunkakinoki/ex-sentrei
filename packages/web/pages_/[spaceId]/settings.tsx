import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import SpaceSettings from "@sentrei/ui/components/SpaceSettings";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SettingsPage: NextPage = () => {
  const {query} = useRouter();
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceSettings");
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
          spaceId={String(query.spaceId)}
        />
      ) : (
        <SentreiAppHeader spaceId={String(query.spaceId)} />
      )}
      {user && profile && (
        <SpaceSettings
          user={user}
          profile={profile}
          spaceId={String(query.spaceId)}
        />
      )}
    </>
  );
};

export default SettingsPage;
