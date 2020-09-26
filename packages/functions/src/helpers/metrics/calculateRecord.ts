import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

const calculateRecord = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
): Metrics.Update | false => {
  const before = change.before.data() as Analytics.Response;

  const nowDate = new Date().getDate();
  const updatedDate = before.updatedAt.toDate().getDate();

  if (nowDate !== updatedDate) {
    const metricsData = {
      record: admin.firestore.FieldValue.increment(1),
    };
    return metricsData;
  } else {
    return false;
  }
};

export default calculateRecord;
