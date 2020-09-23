import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/stats/statsUpdate";
import {roomCollection} from "@sentrei/types/models/Stats";

/**
 * Increase stat count to rooms collection
 */
const roomStatsPlus = functions.firestore
  .document("rooms/{roomId}/{collection}/{docId}")
  .onCreate((snap, context) => {
    const {roomId, collection} = context.params;

    if (!roomCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, "room", 1, roomId);
  });

export default roomStatsPlus;
