import * as admin from "firebase-admin";

const db = admin.firestore();

const deleteParticipant = async (
  roomId: string,
  participantSid: string,
): Promise<void> => {
  try {
    await db.doc(`rooms/${roomId}/participants/${participantSid}`).delete();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteParticipant;
