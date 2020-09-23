import * as admin from "firebase-admin";

import {participantEmoji} from "@sentrei/common/const/emoji";
import Participant from "@sentrei/types/models/Participant";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

const createParticipant = async (
  userId: string,
  roomId: string,
  participantSid: string,
): Promise<void> => {
  try {
    const room = await db.doc(`rooms/${roomId}`).get();
    const roomData = room.data() as Room.Get;
    const profile = await db.doc(`profiles/${userId}`).get();
    const profileData = profile.data() as Profile.Get;

    const participant: Participant.Create = {
      createdAt: timestamp,
      createdBy: profileData,
      createdByUid: userId,
      description: "",
      emoji: participantEmoji(),
      name: profileData.name,
      photo: profileData.photo,
      photoHash: profileData.photoHash,
      room: roomData,
      roomId: roomId,
      namespaceId: profileData.namespaceId,
      participantSid,
      updatedAt: timestamp,
      updatedBy: profileData,
      updatedByUid: userId,
      uid: userId,
      spaceId: roomData.spaceId,
    };

    await db
      .doc(`rooms/${roomId}/participants/${participantSid}`)
      .set(participant);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createParticipant;
