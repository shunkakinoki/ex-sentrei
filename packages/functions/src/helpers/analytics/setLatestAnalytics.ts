import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Stats from "@sentrei/types/models/Stats";

const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Set latest users on update
 */
const setLatestAnalytics = (
  adminId: string,
  model: Analytics.Models,
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
): Analytics.Update | false => {
  let analyticsData;

  const initialData = {
    model,
    period: "latest",
    updatedAt: timestamp,
  };

  switch (adminId) {
    case "actions": {
      const actionsData = change.after.data() as Actions.Response;
      analyticsData = <Analytics.Update>{
        ...initialData,
        actions: actionsData,
      };
      return analyticsData;
    }
    case "metrics": {
      const metricsData = change.after.data() as Metrics.Response;
      analyticsData = <Analytics.Update>{
        ...initialData,
        metrics: metricsData,
      };
      if (
        metricsData?.period?.hour === 0 ||
        metricsData?.period?.day === 0 ||
        metricsData?.period?.week === 0
      ) {
        delete analyticsData.updatedAt;
      }
      return analyticsData;
    }
    case "stats": {
      const statsData = change.after.data() as Stats.Response;
      analyticsData = <Analytics.Update>{
        ...initialData,
        stats: statsData,
      };
      return analyticsData;
    }
    default:
      return false;
  }
};

export default setLatestAnalytics;
