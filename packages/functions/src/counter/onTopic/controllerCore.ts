import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {SHARDS_COLLECTION_ID} from "@sentrei/functions/helpers/counter/const";

import {ShardedCounterController, ControllerStatus} from "@counter/controller";

const config = functions.config().env;
const db = admin.firestore();

export const controllerCore = functions.pubsub
  .topic(`sentrei-${config.environment}-counter`)
  .onPublish(async () => {
    const metadocRef = db.doc(process.env.INTERNAL_STATE_PATH);
    const controller = new ShardedCounterController(
      metadocRef,
      SHARDS_COLLECTION_ID,
    );
    const status = await controller.aggregateOnce({start: "", end: ""}, 200);
    if (
      status === ControllerStatus.WORKERS_RUNNING ||
      status === ControllerStatus.TOO_MANY_SHARDS ||
      status === ControllerStatus.FAILURE
    ) {
      await controller.rescheduleWorkers();
    }
    return null;
  });

export default controllerCore;
