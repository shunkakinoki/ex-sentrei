import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomSettings = dynamic(
  () => import("@sentrei/ui/components/RoomSettings"),
  {
    ssr: false,
  },
);

const Settings: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.model === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (user === undefined || spaceId === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabRoomKey="settings"
          type="room"
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
        />
      </>
    );
  }

  if (!user || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="settings"
          type="room"
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
        />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <SentreiAppHeader
        notificationCount={Number(user.notificationCount)}
        profile={profile}
        namespaceId={String(query.namespaceId)}
        roomId={String(query.roomId)}
        userId={user.uid}
        tabRoomKey="settings"
        type="room"
      />
      <RoomSettings
        roomId={String(query.roomId)}
        namespaceId={String(query.namespaceId)}
        profile={profile}
        user={user}
        spaceId={spaceId}
      />
    </>
  );
};

export default Settings;
