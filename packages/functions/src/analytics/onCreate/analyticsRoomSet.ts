import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Stats from "@sentrei/types/models/Stats";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Set analytics for room
 */
const analyticsRoomSet = functions.firestore
  .document("rooms/{roomId}/analytics/{analyticsId}")
  .onCreate(async (snap, context) => {
    const {roomId} = context.params;

    const actions = await db.doc(`rooms/${roomId}/admin/actions`).get();
    const actionsData = actions.data() as Actions.Response;
    const metrics = await db.doc(`rooms/${roomId}/admin/metrics`).get();
    const metricsData = metrics.data() as Metrics.Response;
    const stats = await db.doc(`rooms/${roomId}/admin/stats`).get();
    const statsData = stats.data() as Stats.Response;

    const analyticsData = <Analytics.Update>{
      actions: actionsData,
      metrics: metricsData,
      model: "room",
      stats: statsData,
      updatedAt: timestamp,
    };

    return snap.ref.set(analyticsData, {merge: true});
  });

export default analyticsRoomSet;
