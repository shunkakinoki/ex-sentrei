import * as admin from "firebase-admin";

import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

const createMemberSession = async (
  userId: string,
  roomId: string,
  participantSid: string,
  roomSid: string,
): Promise<void> => {
  try {
    const room = await db.doc(`rooms/${roomId}`).get();
    const roomData = room.data() as Room.Response;
    const profile = await db.doc(`profiles/${userId}`).get();
    const profileData = profile.data() as Profile.Get;

    const memberSession: Session.Create = {
      createdAt: timestamp,
      createdBy: profileData,
      createdByUid: userId,
      model: "member",
      updatedAt: timestamp,
      updatedBy: profileData,
      updatedByUid: userId,
      room: roomData,
      roomId,
      roomSid,
      status: "connected",
      type: roomData.type,
      spaceId: roomData.spaceId,
    };

    await db.doc(`sessions/${participantSid}`).set(memberSession);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createMemberSession;
