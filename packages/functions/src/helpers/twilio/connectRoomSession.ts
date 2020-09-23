import * as admin from "firebase-admin";

import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

const createRoomSession = async (
  userId: string,
  roomId: string,
  roomSid: string,
): Promise<void> => {
  try {
    const checkRoom = await db.doc(`sessions/${roomSid}`).get();

    if (checkRoom.exists) {
      console.log(`Session ${roomSid} already exists!`);
      return null;
    } else {
      const room = await db.doc(`rooms/${roomId}`).get();
      const roomData = room.data() as Room.Response;
      const profile = await db.doc(`profiles/${userId}`).get();
      const profileData = profile.data() as Profile.Get;

      const roomSession: Session.Create = {
        createdAt: timestamp,
        createdBy: profileData,
        createdByUid: userId,
        model: "room",
        room: roomData,
        roomId,
        roomSid,
        status: "connected",
        updatedAt: timestamp,
        updatedBy: profileData,
        updatedByUid: userId,
        type: roomData.type,
        spaceId: roomData.spaceId,
      };

      await db.doc(`sessions/${roomSid}`).set(roomSession);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createRoomSession;
