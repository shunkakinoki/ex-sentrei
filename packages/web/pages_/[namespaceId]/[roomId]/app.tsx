import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import Loader from "@sentrei/ui/components/Loader";

const SentreiVideoApp = dynamic(() => import("@sentrei/video/VideoApp"), {
  ssr: false,
});

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
    return <Loader />;
  }

  if (!user || !profile) {
    return <HomeScreen />;
  }

  return <SentreiVideoApp />;
};

export default App;
