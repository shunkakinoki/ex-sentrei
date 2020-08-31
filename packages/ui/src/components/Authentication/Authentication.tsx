import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getUserLive} from "@sentrei/common/firebase/users";
import logIPAddress from "@sentrei/common/services/logIPAddress";
import {pageView} from "@sentrei/common/utils/analytics";
import {auth, performance} from "@sentrei/common/utils/firebase";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";

const Authentication = (): null => {
  const {user, setProfile, setUser} = React.useContext(AuthContext);
  const [authState, setAuthState] = React.useState<
    firebase.User | null | undefined
  >(undefined);

  const {backdrop} = useBackdrop();

  React.useEffect(() => {
    auth.onAuthStateChanged(setAuthState);
  }, []);

  React.useEffect(() => {
    let unsubscribe: firebase.Unsubscribe = () => {};

    if (authState) {
      unsubscribe = getUserLive(authState.uid, snap => {
        setUser(snap);
      });
    }

    if (authState === null) {
      setUser(null);
    }

    return (): void => {
      unsubscribe();
    };
  }, [authState, setProfile, setUser]);

  React.useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    setProfile({
      uid: user.uid,
      name: user.name,
      photo: user.photo,
      photoHash: user.photoHash,
      namespace: user.namespace,
    });
  }, [setProfile, user]);

  React.useEffect(() => {
    if (authState) {
      logIPAddress();
    }
  }, [authState]);

  React.useEffect(() => {
    performance();
  }, []);

  React.useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageView(url, user?.uid);
    };

    Router.events.on("routeChangeComplete", handleRouteChange);
    return (): void => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [user]);

  React.useEffect(() => {
    const handleRouteStart = (): void => {
      backdrop("dismiss");
    };
    Router.events.on("routeChangeStart", handleRouteStart);
    return (): void => {
      Router.events.off("routeChangeStart", handleRouteStart);
    };
  }, [backdrop]);

  return null;
};

export default Authentication;
