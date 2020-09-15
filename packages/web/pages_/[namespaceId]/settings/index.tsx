import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";

import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceSettings = dynamic(
  () => import("@sentrei/ui/components/SpaceSettings"),
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
          tabSpaceKey="settings"
          model="space"
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
          tabSpaceKey="settings"
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
        tabSpaceKey="settings"
        model="space"
      />
      <SpaceSettings
        namespaceId={String(query.namespaceId)}
        spaceId={spaceId}
        profile={profile}
        user={user}
      />
    </>
  );
};

export default Settings;
