import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Invite from "@sentrei/types/models/Invite";

const db = admin.firestore();

/**
 * Delete Outdated Invite for Day
 */
const outdatedInviteDelete = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(() => {
    db.collection("spaces")
      .get()
      .then(spaceShot => {
        spaceShot.forEach(space => {
          space.ref
            .collection("invites")
            .get()
            .then(inviteShot => {
              inviteShot.forEach(invite => {
                const inviteData = invite.data() as Invite.Response;
                if (
                  inviteData.method === "email" ||
                  inviteData.period === "never"
                ) {
                  return;
                }

                const nowDate = new Date().getTime();
                const createdDate = inviteData.createdAt.toDate().getTime();
                const diff = nowDate - createdDate;

                switch (inviteData.period) {
                  case "day": {
                    if (diff > 86400000) {
                      try {
                        db.doc(
                          `spaces/${space.id}/invites/${invite.id}`,
                        ).delete();
                      } catch (err) {
                        console.error(err.message);
                      }
                    }
                    break;
                  }
                  case "week": {
                    if (diff > 604800000) {
                      try {
                        db.doc(
                          `spaces/${space.id}/invites/${invite.id}`,
                        ).delete();
                      } catch (err) {
                        console.error(err.message);
                      }
                    }
                    break;
                  }
                }
              });
            });
        });
      });
    return;
  });

export default outdatedInviteDelete;
