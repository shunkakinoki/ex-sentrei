import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Set analytics for user
 */
const analyticsUserSet = functions.firestore
  .document("users/{userId}/analytics/{analyticsId}")
  .onCreate(async (snap, context) => {
    const {userId} = context.params;

    const actions = await db.doc(`users/${userId}/admin/actions`).get();
    const actionsData = actions.data() as Actions.Response;
    const metrics = await db.doc(`users/${userId}/admin/metrics`).get();
    const metricsData = metrics.data() as Metrics.Response;

    const analyticsData = <Analytics.Update>{
      actions: actionsData,
      metrics: metricsData,
      updatedAt: timestamp,
    };

    return snap.ref.set(analyticsData, {merge: true});
  });

export default analyticsUserSet;
