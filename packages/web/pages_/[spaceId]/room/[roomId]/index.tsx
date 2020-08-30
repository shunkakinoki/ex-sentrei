import Router from "next-translate/Router";
import dynamic from "next/dynamic";

import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";

const RoomScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/RoomScreen");
  },
  {ssr: false},
);

const RoomId = (): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("room");
  }, []);

  if (!user) {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile) {
    return <Loader />;
  }

  return (
    <>
      {user && (
        <RoomScreen
          user={user}
          profile={profile}
          spaceId={String(query.spaceId)}
          roomId={String(query.roomId)}
        />
      )}
    </>
  );
};

export default RoomId;
