import Head from "next/head";
import * as React from "react";

import invokeMemberSpace from "@sentrei/common/services/invokeMemberSpace";
import oneTap from "@sentrei/common/services/oneTap";
import firebase, {auth} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import User from "@sentrei/types/models/User";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  user: User.Get | undefined | null;
  delay?: boolean;
  inviteId?: string;
  spaceId?: string;
}

const OneTap = ({
  delay = false,
  user,
  inviteId,
  spaceId,
}: Props): JSX.Element => {
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callback = async (res: any): Promise<void> => {
    const FirebaseCredential = firebase.auth.GoogleAuthProvider.credential(
      res.credential,
    );
    await firebase
      .auth()
      .signInWithCredential(FirebaseCredential)
      .then(() => {
        backdrop("loading");
        trackEvent("Signed In", {provider: "onetap"});
        if (inviteId && spaceId) {
          auth.onAuthStateChanged(() => {
            invokeMemberSpace(spaceId, inviteId);
          });
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  React.useEffect(() => {
    if (!delay && user === null) {
      oneTap(callback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (delay) {
        oneTap(callback);
      }
    }, 3000);
    return (): void => clearTimeout(timer);
  });

  return (
    <Head>
      <script src="https://accounts.google.com/gsi/client" async defer />
    </Head>
  );
};

export default OneTap;
