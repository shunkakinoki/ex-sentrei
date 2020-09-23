/* eslint-disable @typescript-eslint/no-explicit-any */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import getProfileChanges from "./getProfileChanges";

const updateProfile = async (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  collection: string,
  action: "created" | "updated",
  uid: string,
): Promise<boolean> => {
  const profileData = getProfileChanges(change);
  const fieldId = action === "created" ? "createdByUid" : "updatedByUid";
  const fieldProfile = action === "created" ? "createdBy" : "updatedBy";

  if (!profileData) {
    return false;
  }

  const ref = await admin
    .firestore()
    .collection(collection)
    .where(fieldId, "==", uid)
    .get();
  const promises: any[] = [];

  ref.docs.forEach(doc => {
    promises.push(doc.ref.update({[fieldProfile]: profileData}));
  });

  await Promise.all(promises);

  return true;
};

export default updateProfile;
