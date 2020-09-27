import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

const calculateRecord = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  user?: boolean,
): Metrics.Update | false => {
  const before = change.before.data() as Analytics.Response;
  let metricsData: Metrics.Update;

  const nowDate = new Date();
  const updatedDate = before.updatedAt.toDate();

  if (nowDate.getDate() !== updatedDate.getDate()) {
    metricsData = {
      record: admin.firestore.FieldValue.increment(1),
    };
    if (!user) {
      metricsData = {
        ...metricsData,
        period: {day: admin.firestore.FieldValue.increment(1)},
      };
    }
  }

  if (user) {
    if (metricsData) {
      return metricsData;
    } else {
      return false;
    }
  }

  if (
    nowDate.getDate() !== updatedDate.getDate() ||
    (nowDate.getDate() === updatedDate.getDate() &&
      nowDate.getHours() !== updatedDate.getHours())
  ) {
    metricsData = {
      ...metricsData,
      period: {
        ...metricsData.period,
        hour: admin.firestore.FieldValue.increment(1),
      },
    };
  }

  /* Gist borrowed from: https://gist.github.com/IamSilviu/5899269 */
  function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(nowDate.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  if (
    nowDate.getDate() !== updatedDate.getDate() &&
    nowDate.getHours() !== updatedDate.getHours() &&
    getWeekNumber(nowDate) !== getWeekNumber(updatedDate)
  ) {
    metricsData = {
      ...metricsData,
      period: {
        ...metricsData.period,
        week: admin.firestore.FieldValue.increment(1),
      },
    };
  }

  return metricsData;
};

export default calculateRecord;
