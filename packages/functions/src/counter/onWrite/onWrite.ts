import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {SHARDS_COLLECTION_ID} from "@sentrei/functions/helpers/counter/const";

import {ShardedCounterController} from "@counter/controller";

const db = admin.firestore();

export const onWrite = functions.firestore
  .document("{collection}/{docId}")
  .onWrite(async () => {
    const metadocRef = db.doc(process.env.INTERNAL_STATE_PATH);
    const controller = new ShardedCounterController(
      metadocRef,
      SHARDS_COLLECTION_ID,
    );
    await controller.aggregateContinuously({start: "", end: ""}, 200, 60000);
  });

export default onWrite;
