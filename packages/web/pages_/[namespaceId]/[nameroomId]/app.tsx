import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getMembers} from "@sentrei/common/firebase/members";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import Member from "@sentrei/types/models/Member";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import Loader from "@sentrei/ui/components/Loader";
import AppStateProvider from "@sentrei/video/state";

const SentreiVideoApp = dynamic(() => import("@sentrei/video/VideoApp"), {
  ssr: false,
});

const App = (): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

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
    if (spaceId) {
      getMembers({spaceId}).then(setMembers);
    }
  }, [spaceId]);

  if (
    user === undefined ||
    profile === undefined ||
    spaceId === undefined ||
    members === undefined
  ) {
    return <Loader />;
  }

  if (!user || !profile || !spaceId || !members) {
    return <HomeScreen />;
  }

  return (
    <AppStateProvider roomId={String(query.roomId)}>
      <SentreiVideoApp />
    </AppStateProvider>
  );
};

export default App;
