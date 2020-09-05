import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";

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
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.type === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (user === undefined || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="settings"
          type="room"
          namespaceId={String(query.namespaceId)}
        />
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
          spaceId={spaceId}
        />
      )}
    </>
  );
};

export default Edit;
