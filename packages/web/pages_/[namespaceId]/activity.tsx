import {NextPage} from "next";

import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceActivity from "@sentrei/ui/components/SpaceActivity";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const ActivityPage: NextPage = () => {
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

  if (user === undefined || spaceId === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabSpaceKey="activity"
          type="space"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonList />
      </>
    );
  }

  if (!user || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="activity"
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
        tabSpaceKey="activity"
        type="space"
      />
      <SpaceActivity spaceId={spaceId} />
    </>
  );
};

export default ActivityPage;
