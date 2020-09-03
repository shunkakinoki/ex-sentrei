import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomSettings = dynamic(
  () => import("@sentrei/ui/components/RoomSettings"),
  {
    ssr: false,
  },
);

const Edit: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("roomEdit");
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
        <RoomSettings
          roomId={String(query.roomId)}
          namespaceId={String(query.namespaceId)}
          profile={profile}
          user={user}
        />
      )}
    </>
  );
};

export default Edit;
