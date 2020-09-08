import {NextPage} from "next";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import {getNamespace} from "@sentrei/common/firebase/namespaces";
import {NamespaceType} from "@sentrei/types/models/Namespace";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SupportPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [type, setType] = React.useState<NamespaceType | null | undefined>();

  React.useEffect(() => {
    async function setNamespaceType(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace) {
        return;
      }
      setType(namespace.type);
    }
    setNamespaceType();
  }, [query.namespaceId]);

  if (user === undefined || type === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          type="user"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile || !type) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          type="user"
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
        type={type}
      />
      <SupportScreen email={user.email} name={profile.name} userId={user.uid} />
    </>
  );
};

export default SupportPage;
