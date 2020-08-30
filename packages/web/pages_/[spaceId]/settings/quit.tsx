import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceQuit = dynamic(() => import("@sentrei/ui/components/SpaceQuit"), {
  ssr: false,
});

const SettingsQuitPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceQuit");
  }, []);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="leaderboard" type="space" />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
          tabSpaceKey="settings"
          type="space"
        />
      )}
      {user && profile && (
        <SpaceQuit spaceId={String(query.spaceId)} user={user} />
      )}
    </>
  );
};

export default SettingsQuitPage;