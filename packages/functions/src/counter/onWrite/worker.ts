import * as functions from "firebase-functions";

import {SHARDS_COLLECTION_ID} from "@sentrei/functions/helpers/counter/const";

import {ShardedCounterWorker} from "@counter/worker";

export const worker = functions.firestore
  .document("{collection}/{docId}")
  .onWrite(async change => {
    if (!change.after.exists) return;

    const worker = new ShardedCounterWorker(change.after, SHARDS_COLLECTION_ID);
    await worker.run();
  });
export default worker;
