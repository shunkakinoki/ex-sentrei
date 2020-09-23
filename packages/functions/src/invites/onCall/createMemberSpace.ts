import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {memberEmoji} from "@sentrei/common/const/emoji";
import Invite from "@sentrei/types/models/Invite";
import Member from "@sentrei/types/models/Member";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

/**
 * Create Member Space for Invite
 */
const createMemberSpace = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
    );
  }

  const {inviteId} = data;
  if (!inviteId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "inviteId is required!",
    );
  }

  const {spaceId} = data;
  if (!spaceId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "spaceId is required!",
    );
  }

  try {
    const userId = context.auth.uid;

    if ((await db.doc(`spaces/${spaceId}/members/${userId}`).get()).exists) {
      throw new Error("Member already exists!");
    }

    const invite = await db.doc(`spaces/${spaceId}/invites/${inviteId}`).get();
    const inviteData = invite.data() as Invite.Response;

    const user = await db.doc(`users/${context.auth.uid}`).get();
    const userData = user.data() as User.Response;

    if (inviteData.method === "email") {
      db.doc(`spaces/${spaceId}/invites/${inviteId}`).delete();
    }

    const member: Member.Create = {
      createdAt: inviteData.createdAt,
      createdBy: inviteData.createdBy,
      createdByUid: inviteData.createdByUid,
      description: "",
      duration: 0,
      emoji: memberEmoji(),
      photo: userData.photo,
      photoHash: userData.photoHash,
      name: userData.name,
      namespaceId: userData.namespaceId,
      record: 0,
      role: "viewer",
      score: 0,
      status: "offline",
      updatedAt: inviteData.createdAt,
      uid: context.auth.uid,
      updatedBy: inviteData.createdBy,
      updatedByUid: inviteData.createdByUid,
    };

    return db.doc(`spaces/${spaceId}/members/${userId}`).set(member);
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

export default createMemberSpace;
