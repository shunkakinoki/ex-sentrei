import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

const calculateRecord = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  user?: boolean,
): Metrics.Update | false => {
  const before = change.before.data() as Analytics.Response;
  const after = change.after.data() as Analytics.Response;

  const recordValue = admin.firestore.FieldValue.increment(1);
  let metricsData = <Metrics.Update>{};

  const nowDate = new Date().getDate();
  const updatedDate = before.updatedAt.toDate().getDate();

  if (nowDate !== updatedDate) {
    metricsData = {
      record: admin.firestore.FieldValue.increment(1),
    };
  }

  if (user) {
    metricsData = {
      ...metricsData,
      period: {
        latest: 1,
        hour: 1,
        day: 1,
        week: 1,
      },
    };

    if (after.metrics.period.latest > 0) {
      metricsData = {
        ...metricsData,
        period: {
          latest: 1,
        },
      };
    }

    if (after.metrics.period.hour > 0) {
      metricsData = {
        ...metricsData,
        period: {
          ...metricsData.period,
          hour: 1,
        },
      };
    }

    if (after.metrics.period.day > 0) {
      metricsData = {
        ...metricsData,
        period: {
          ...metricsData.period,
          day: 1,
        },
      };
    }

    if (after.metrics.period.week > 0) {
      metricsData = {
        ...metricsData,
        period: {
          ...metricsData.period,
          week: 1,
        },
      };
    }

    return metricsData;
  }

  if (after.metrics.period.latest === 0) {
    metricsData = {
      ...metricsData,
      period: {
        latest: recordValue,
      },
    };
  }

  if (after.metrics.period.hour === 0) {
    metricsData = {
      ...metricsData,
      period: {
        ...metricsData.period,
        hour: recordValue,
      },
    };
  }

  if (after.metrics.period.day === 0) {
    metricsData = {
      ...metricsData,
      period: {
        ...metricsData.period,
        day: recordValue,
      },
    };
  }

  if (after.metrics.period.week === 0) {
    metricsData = {
      ...metricsData,
      period: {
        ...metricsData.period,
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
