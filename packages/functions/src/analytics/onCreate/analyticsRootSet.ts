import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Stats from "@sentrei/types/models/Stats";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Set analytics for root
 */
const analyticsRootSet = functions.firestore
  .document("analytics/{analyticsId}")
  .onCreate(async snap => {
    const actions = await db.doc("admin/actions").get();
    const actionsData = actions.data() as Actions.Response;
    const metrics = await db.doc("admin/metrics").get();
    const metricsData = metrics.data() as Metrics.Response;
    const stats = await db.doc("admin/stats").get();
    const statsData = stats.data() as Stats.Response;

    const analyticsData = <Analytics.Update>{
      actions: actionsData,
      metrics: metricsData,
      stats: statsData,
      updatedAt: timestamp,
    };

    return snap.ref.set(analyticsData, {merge: true});
  });

export default analyticsRootSet;
