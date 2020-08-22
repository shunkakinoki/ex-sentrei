import firebase from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import Status from "@sentrei/types/models/Status";
import "firebase/database";

// eslint-disable-next-line import/prefer-default-export
export const updateStatus = (
  uid: string,
  profile: Profile.Get,
  isAway: boolean,
): void => {
  const statusRef = firebase.database().ref(`/status/${uid}`);
  firebase
    .database()
    .ref(".info/connected")
    .on("value", snapshot => {
      if (snapshot.val() === false) {
        statusRef.set(<Status>{
          profile,
          status: "away",
        });
        return;
      }
      statusRef
        .onDisconnect()
        .set({
          profile,
          status: "offline",
        })
        .then(() => {
          if (isAway) {
            statusRef.set(<Status>{
              profile,
              status: "away",
            });
          } else {
            statusRef.set(<Status>{
              profile,
              status: "online",
            });
          }
        });
    });
};
