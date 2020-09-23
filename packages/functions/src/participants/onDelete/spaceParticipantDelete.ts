import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Delete room on room delete
 */
const spaceParticipantDelete = functions.firestore
  .document("rooms/{roomId}/participants/{participantId}")
  .onDelete(async (snap, context) => {
    const {participantId} = context.params;
    const data = snap.data() as Room.Response;

    return db
      .doc(`spaces/${data.spaceId}/participants/${participantId}`)
      .delete();
  });

export default spaceParticipantDelete;
