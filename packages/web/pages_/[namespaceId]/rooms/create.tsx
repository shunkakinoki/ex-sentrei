import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomCreate = dynamic(() => import("@sentrei/ui/components/RoomCreate"), {
  ssr: false,
});

const CreatePage: NextPage = () => {
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

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="rooms"
          type="space"
          namespaceId={String(query.namespaceId)}
        />
      </>
    );
  }

  if (!user || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="rooms"
          type="space"
          namespaceId={String(query.namespaceId)}
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
        userId={user.uid}
        namespaceId={String(query.namespaceId)}
        tabSpaceKey="rooms"
        type="space"
      />
      <RoomCreate
        spaceId={spaceId}
        namespaceId={String(query.namespaceId)}
        profile={profile}
        user={user}
      />
    </>
  );
};

export default CreatePage;
