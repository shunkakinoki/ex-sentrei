import * as functions from "firebase-functions";
import {isEqual} from "lodash";

import Metrics from "@sentrei/types/models/Metrics";

const getMetricsChanges = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
): Partial<Metrics.Update> | null => {
  const before = change.before.data() as Metrics.Response;
  const after = change.after.data() as Metrics.Response;

  if (isEqual(before, after)) {
    return null;
  }

  return after;
};

export default getMetricsChanges;
