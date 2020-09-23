import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/stats/statsUpdate";
import {spaceCollection} from "@sentrei/types/models/Stats";

/**
 * Decrease stat count to spaces collection
 */
const spaceStatsMinus = functions.firestore
  .document("spaces/{spaceId}/{collection}/{docId}")
  .onDelete((snap, context) => {
    const {spaceId, collection} = context.params;

    if (!spaceCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, "space", -1, spaceId);
  });

export default spaceStatsMinus;
