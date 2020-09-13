import {NextPage} from "next";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import {getNamespace} from "@sentrei/common/firebase/namespaces";
import {NamespaceModel} from "@sentrei/types/models/Namespace";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Support: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [model, setModel] = React.useState<NamespaceModel | null | undefined>(
    "user",
  );

  React.useEffect(() => {
    async function setNamespaceModel(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace) {
        return;
      }
      setModel(namespace.model);
    }
    setNamespaceModel();
  }, [query.namespaceId]);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          model="user"
          namespaceId={String(query.namespaceId)}
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile || !model) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          model="user"
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
        model={model}
      />
      <SupportScreen email={user.email} name={profile.name} userId={user.uid} />
    </>
  );
};

export default Support;
