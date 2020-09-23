import * as admin from "firebase-admin";

import Profile from "@sentrei/types/models/Profile";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

const disconnectMemberSession = async (
  userId: string,
  participantSid: string,
  roomSid: string,
  memberDuration: number,
): Promise<void> => {
  try {
    const profile = await db.doc(`profiles/${userId}`).get();
    const profileData = profile.data() as Profile.Get;

    const memberSession: Session.Update = {
      duration: memberDuration,
      updatedAt: timestamp,
      updatedBy: profileData,
      updatedByUid: userId,
      status: "disconnected",
    };

    await db.doc(`sessions/${participantSid}`).update(memberSession);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default disconnectMemberSession;
