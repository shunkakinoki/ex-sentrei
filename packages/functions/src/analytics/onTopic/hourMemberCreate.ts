import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Member Analytics for Hour
 */
const hourMemberCreate = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "hour"};
  db.collection("spaces")
    .get()
    .then(spaceShot => {
      spaceShot.forEach(space => {
        space.ref
          .collection("members")
          .get()
          .then(memberShot => {
            memberShot.forEach(member => {
              try {
                db.collection(
                  `spaces/${space.id}/members/${member.id}/analytics`,
                ).add(analyticsData);
              } catch (err) {
                console.error(err.message);
              }
            });
          });
      });
    });
  return;
});

export default hourMemberCreate;
