import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getMembers} from "@sentrei/common/firebase/members";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import Member from "@sentrei/types/models/Member";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomId = (): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

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

  React.useEffect(() => {
    if (spaceId) {
      getMembers({spaceId}).then(setMembers);
    }
  }, [spaceId]);

  if (user === undefined || spaceId === undefined || members === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabRoomKey="home"
          type="room"
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
        />
      </>
    );
  }

  if (!user || !profile || !spaceId || !members) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="home"
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
        tabRoomKey="home"
        type="room"
      />
    </>
  );
};

export default RoomId;
