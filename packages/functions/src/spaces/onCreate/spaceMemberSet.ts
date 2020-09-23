import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set member on space create
 */
const spaceMemberSet = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(snap => {
    const data = snap.data() as Space.Response;
    const member: Member.Create = {
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      createdByUid: data.createdByUid,
      description: "",
      duration: 0,
      emoji: ":blush:",
      photo: data.createdBy.photo,
      photoHash: data.createdBy.photoHash,
      name: data.createdBy.name,
      namespaceId: data.createdBy.namespaceId,
      record: 0,
      role: "admin",
      score: 0,
      status: "offline",
      updatedAt: data.createdAt,
      uid: data.createdByUid,
      updatedBy: data.createdBy,
      updatedByUid: data.createdByUid,
    };

    return db.doc(`spaces/${snap.id}/members/${data.createdByUid}`).set(member);
  });

export default spaceMemberSet;
