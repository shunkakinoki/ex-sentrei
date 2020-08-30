import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceEdit = dynamic(() => import("@sentrei/ui/components/SpaceEdit"), {
  ssr: false,
});

const SettingsPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceEdit");
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
        />
      )}
      {user && profile && (
        <SpaceEdit
          spaceId={String(query.spaceId)}
          profile={profile}
          user={user}
        />
      )}
    </>
  );
};

export default SettingsPage;
