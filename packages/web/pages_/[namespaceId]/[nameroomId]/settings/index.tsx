import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNameroom} from "@sentrei/common/firebase/namerooms";
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
  const [roomId, setRoomId] = React.useState<string | null | undefined>();
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

  React.useEffect(() => {
    async function setRoom(): Promise<void> {
      if (!spaceId) {
        return;
      }
      const nameroom = await getNameroom(spaceId, String(query.nameroomId));
      if (!nameroom) {
        return;
      }
      setRoomId(nameroom.uid);
    }
    setRoom();
  }, [query.nameroomId, spaceId]);

  if (user === undefined || spaceId === undefined || roomId === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabRoomKey="settings"
          model="room"
          namespaceId={String(query.namespaceId)}
          nameroomId={String(query.nameroomId)}
        />
      </>
    );
  }

  if (!user || !profile || !spaceId || !roomId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="settings"
          model="room"
          namespaceId={String(query.namespaceId)}
          nameroomId={String(query.nameroomId)}
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
        nameroomId={String(query.nameroomId)}
        userId={user.uid}
        tabRoomKey="settings"
        model="room"
      />
      <RoomSettings
        roomId={roomId}
        nameroomId={String(query.nameroomId)}
        namespaceId={String(query.namespaceId)}
        profile={profile}
        user={user}
        spaceId={spaceId}
      />
    </>
  );
};

export default Settings;
