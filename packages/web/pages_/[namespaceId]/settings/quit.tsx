import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceQuit = dynamic(() => import("@sentrei/ui/components/SpaceQuit"), {
  ssr: false,
});

const SpaceQuitPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceQuit");
  }, []);

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="settings" type="space" />
        <GridSettings skeleton tabSpaceKey="quit" type="space">
          <SkeletonForm />
        </GridSettings>
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
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="settings"
          type="space"
        />
      )}
      {user && (
        <SpaceQuit namespaceId={String(query.namespaceId)} user={user} />
      )}
    </>
  );
};

export default SpaceQuitPage;
