import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
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
    return <Loader />;
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
