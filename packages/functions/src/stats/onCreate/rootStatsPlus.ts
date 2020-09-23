import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/stats/statsUpdate";
import {rootCollection} from "@sentrei/types/models/Stats";

/**
 * Increase stat count to root collection
 */
const rootStatsPlus = functions.firestore
  .document("{collection}/{docId}")
  .onCreate((snap, context) => {
    const {collection} = context.params;

    if (!rootCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, "root", 1);
  });

export default rootStatsPlus;
