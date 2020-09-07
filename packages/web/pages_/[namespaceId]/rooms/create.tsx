import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";

import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
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

  if (!user && typeof window !== "undefined") {
    setTimeout(() => {
      Router.pushI18n("/");
    }, 3000);
  }

  if (user === undefined || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabSpaceKey="rooms"
          type="space"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonForm />
      </>
    );
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="rooms"
          type="space"
        />
      )}
      {user && (
        <RoomCreate
          spaceId={spaceId}
          namespaceId={String(query.namespaceId)}
          profile={profile}
          user={user}
        />
      )}
    </>
  );
};

export default CreatePage;
