import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomCreate = dynamic(() => import("@sentrei/ui/components/RoomCreate"), {
  ssr: false,
});

const CreatePage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("roomCreate");
  }, []);

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="rooms" type="space" />
        <SkeletonForm />
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
          tabSpaceKey="rooms"
          type="space"
        />
      )}
      {user && (
        <RoomCreate
          namespaceId={String(query.namespaceId)}
          profile={profile}
          user={user}
        />
      )}
    </>
  );
};

export default CreatePage;
