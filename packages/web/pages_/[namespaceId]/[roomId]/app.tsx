import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import VideoApp from "@sentrei/video";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const App = (): JSX.Element => {
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

  if (user === undefined || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabRoomKey="home"
          type="room"
          namespaceId={String(query.namespaceId)}
        />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="home"
          type="room"
          namespaceId={String(query.namespaceId)}
        />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <VideoApp />
    </>
  );
};

export default App;
