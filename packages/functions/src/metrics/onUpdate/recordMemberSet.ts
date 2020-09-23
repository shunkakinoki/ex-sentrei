import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";
const db = admin.firestore();

/**
 * Set record for member
 */
const recordMemberSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/admin/metrics")
  .onUpdate(async (change, context) => {
    const {spaceId, memberId} = context.params;

    const before = change.before.data() as Metrics.Response;
    const after = change.after.data() as Metrics.Response;

    if (after.score === before.score) {
      return false;
    }

    const batch = db.batch();

    const memberData: Metrics.Response = {
      period: {
        latest: after.period.latest === 0 ? 1 : 0,
        hour: after.period.hour === 0 ? 1 : 0,
        day: after.period.day === 0 ? 1 : 0,
        week: after.period.week === 0 ? 1 : 0,
      },
      record: after.record,
    };

    const memberRef = db.doc(
      `spaces/${spaceId}/members/${memberId}/admin/metrics`,
    );

    batch.set(memberRef, memberData, {merge: true});

    return batch.commit();
  });

export default recordMemberSet;
