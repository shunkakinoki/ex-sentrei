import * as admin from "firebase-admin";

import Stats from "@sentrei/types/models/Stats";

const db = admin.firestore();

const statsUpdate = (
  collection: string,
  type: "root" | "room" | "space",
  value: 1 | -1,
  docId?: string,
): Promise<FirebaseFirestore.WriteResult[]> => {
  const batch = db.batch();

  const adminRef = db.doc("admin/stats");

  switch (type) {
    case "root": {
      const changes = <Stats.Root>{
        [collection]: admin.firestore.FieldValue.increment(value),
      };
      batch.set(adminRef, changes, {merge: true});
      break;
    }
    case "room": {
      const changes = <Stats.Room>{
        [collection]: admin.firestore.FieldValue.increment(value),
      };
      const roomRef = db.doc(`rooms/${docId}/admin/stats`);
      batch.set(roomRef, changes, {merge: true});
      if (collection === "participants") {
        batch.set(adminRef, changes, {merge: true});
      }
      break;
    }
    case "space": {
      const changes = <Stats.Space>{
        [collection]: admin.firestore.FieldValue.increment(value),
      };
      const spaceRef = db.doc(`spaces/${docId}/admin/stats`);
      batch.set(spaceRef, changes, {merge: true});
      if (
        collection === "invites" ||
        collection === "members" ||
        collection === "namerooms"
      ) {
        batch.set(adminRef, changes, {merge: true});
      }
      break;
    }
    default: {
      break;
    }
  }

  return batch.commit();
};

export default statsUpdate;
