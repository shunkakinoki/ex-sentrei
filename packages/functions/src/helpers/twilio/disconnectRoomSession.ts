import * as admin from "firebase-admin";

import Profile from "@sentrei/types/models/Profile";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

const disconnectRoomSession = async (
  userId: string,
  roomSid: string,
  roomDuration: number,
): Promise<void> => {
  try {
    const profile = await db.doc(`profiles/${userId}`).get();
    const profileData = profile.data() as Profile.Get;

    const roomSession: Session.Update = {
      duration: roomDuration,
      updatedAt: timestamp,
      updatedBy: profileData,
      updatedByUid: userId,
      status: "disconnected",
    };

    await db.doc(`sessions/${roomSid}`).update(roomSession);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default disconnectRoomSession;
