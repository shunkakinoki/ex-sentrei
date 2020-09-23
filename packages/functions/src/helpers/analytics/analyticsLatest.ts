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
const analyticsLatest = (
  adminId: string,
  model: Analytics.Models,
  change: functions.Change<functions.firestore.QueryDocumentSnapshot>,
): Analytics.Update | false => {
  let analyticsData;
  const initialData = {
    updatedAt: timestamp,
    model,
    period: "latest",
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

export default analyticsLatest;
