import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomDelete = dynamic(() => import("@sentrei/ui/components/RoomDelete"), {
  ssr: false,
});

const Delete: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("roomDelete");
  }, []);

  if (user === undefined || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabRoomKey="settings" type="room" />
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
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
          userId={user.uid}
          tabRoomKey="settings"
          type="room"
        />
      )}
      {user && (
        <RoomDelete
          roomId={String(query.roomId)}
          namespaceId={String(query.namespaceId)}
        />
      )}
    </>
  );
};

export default Delete;
