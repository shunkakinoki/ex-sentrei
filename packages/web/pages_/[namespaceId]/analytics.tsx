import {NextPage} from "next";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";

import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceAnalytics = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceAnalytics");
  },
  {ssr: false},
);

const Analytics: NextPage = () => {
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
          tabSpaceKey="analytics"
          model="space"
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
          tabSpaceKey="analytics"
          model="space"
          namespaceId={String(query.namespaceId)}
        />
        <ErrorScreen />
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
        tabSpaceKey="analytics"
        model="space"
      />
      <SpaceAnalytics spaceId={spaceId} />
    </>
  );
};

export default Analytics;
