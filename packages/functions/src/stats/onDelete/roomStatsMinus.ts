import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/stats/statsUpdate";
import {roomCollection} from "@sentrei/types/models/Stats";

/**
 * Decrease stat count to rooms collection
 */
const roomStatsMinus = functions.firestore
  .document("rooms/{roomId}/{collection}/{docId}")
  .onDelete((snap, context) => {
    const {roomId, collection} = context.params;

    if (!roomCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, "room", -1, roomId);
  });

export default roomStatsMinus;
