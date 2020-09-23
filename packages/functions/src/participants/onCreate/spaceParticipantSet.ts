import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Participant from "@sentrei/types/models/Participant";

const db = admin.firestore();

/**
 * Set participant on room create
 */
const spaceParticipantSet = functions.firestore
  .document("rooms/{roomId}/participants/{participantId}")
  .onCreate(async (snap, context) => {
    const {participantId} = context.params;
    const data = snap.data() as Participant.Response;

    return db
      .doc(`spaces/${data.spaceId}/participants/${participantId}`)
      .set(data);
  });

export default spaceParticipantSet;
