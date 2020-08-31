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

const SpaceInvite = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceInvite");
  },
  {ssr: false},
);

const SpaceInvitePage: NextPage = () => {
  const {query} = useRouter();
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceInvite");
  }, []);

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="settings" type="space" />
        <GridSettings skeleton tabSpaceKey="invite" type="space">
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
          spaceId={String(query.spaceId)}
          tabSpaceKey="settings"
          type="space"
        />
      )}
      {user && (
        <SpaceInvite
          profile={profile}
          user={user}
          spaceId={String(query.spaceId)}
        />
      )}
    </>
  );
};

export default SpaceInvitePage;
