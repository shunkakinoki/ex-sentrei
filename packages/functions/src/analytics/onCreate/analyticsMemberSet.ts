import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Set analytics for member
 */
const analyticsMemberSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/analytics/{analyticsId}")
  .onCreate(async (snap, context) => {
    const {spaceId, memberId} = context.params;

    const actions = await db
      .doc(`spaces/${spaceId}/members/${memberId}/admin/actions`)
      .get();
    const actionsData = actions.data() as Actions.Response;
    const metrics = await db
      .doc(`spaces/${spaceId}/members/${memberId}/admin/metrics`)
      .get();
    const metricsData = metrics.data() as Metrics.Response;

    const analyticsData = <Analytics.Update>{
      actions: actionsData,
      metrics: metricsData,
      model: "member",
      updatedAt: timestamp,
    };

    return snap.ref.set(analyticsData, {merge: true});
  });

export default analyticsMemberSet;
