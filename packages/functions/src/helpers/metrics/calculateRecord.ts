import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

const calculateRecord = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  user?: boolean,
): Metrics.Update | false => {
  const before = change.before.data() as Analytics.Response;
  const after = change.before.data() as Analytics.Response;

  const recordValue = admin.firestore.FieldValue.increment(1);
  const metricsData = <Metrics.Update>{};

  if (user) {
    const nowDate = new Date().getDate();
    const updatedDate = before.updatedAt.toDate().getDate();

    const metricsData: Metrics.Update = {
      period: {
        latest: 1,
        hour: 1,
        day: 1,
        week: 1,
      },
      record: admin.firestore.FieldValue.increment(
        nowDate === updatedDate ? 0 : 1,
      ),
    };

    return metricsData;
  }

  if (after.metrics.period.latest === 0) {
    return {
      ...metricsData,
      period: {
        latest: recordValue,
      },
    };
  } else if (after.metrics.period.hour === 0) {
    return {
      ...metricsData,
      period: {
        hour: recordValue,
      },
    };
  } else if (after.metrics.period.day === 0) {
    return {
      ...metricsData,
      period: {
        day: recordValue,
      },
    };
  } else if (after.metrics.period.week === 0) {
    return {
      ...metricsData,
      period: {
        week: recordValue,
      },
    };
  }

  if (metricsData === {}) {
    return false;
  }

  return metricsData;
};

export default calculateRecord;