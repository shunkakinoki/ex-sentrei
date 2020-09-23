import * as firebase from "@firebase/testing";

import {
  adminMemberResponse,
  viewerMemberResponse,
  moderatorMemberResponse,
} from "@sentrei/functions/__dummy__/Member";
import {userResponse} from "@sentrei/functions/__dummy__/User";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";
import User from "@sentrei/types/models/User";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{uid: "userId"});
  await loadFirestoreRules();
  await admin
    .doc("users/userId")
    .set(<User.Response>{...userResponse, role: "viewer"});
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Admins can delete", async done => {
  const ref = db.doc("spaces/adminDoc");
  await admin.doc("users/userId").set(<User.Update>{role: "admin"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Moderators can delete", async done => {
  const ref = db.doc("spaces/moderatorDoc");
  await admin.doc("users/userId").set(<User.Update>{role: "moderator"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Viewers cannot delete", async done => {
  const ref = db.doc("spaces/viewerDoc");
  await admin.doc("users/userId").set(<User.Update>{role: "viewer"});
  await firebase.assertFails(ref.delete());
  done();
});

test("Space role admins can delete", async done => {
  const ref = db.doc("spaces/adminDoc");
  await admin.doc("spaces/adminDoc/members/userId").set(adminMemberResponse);
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Space role moderators can not delete", async done => {
  const ref = db.doc("spaces/adminDoc");
  await admin
    .doc("spaces/adminDoc/members/userId")
    .set(moderatorMemberResponse);
  await firebase.assertFails(ref.delete());
  done();
});

test("Space role viewers can not delete", async done => {
  const ref = db.doc("spaces/adminDoc");
  await admin.doc("spaces/adminDoc/members/userId").set(viewerMemberResponse);
  await firebase.assertFails(ref.delete());
  done();
});
