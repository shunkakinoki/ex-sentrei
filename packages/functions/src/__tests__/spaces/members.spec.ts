import * as firebase from "@firebase/testing";

import {
  memberDescriptionUpdate,
  memberEmojiUpdate,
} from "@sentrei/functions/__dummy__/Member";
import {
  profileGet,
  profileResponse,
} from "@sentrei/functions/__dummy__/Profile";
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
let ref: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{uid: "userId"});
  ref = db.doc("spaces/spaceId/members/userId");
  await loadFirestoreRules();
  await admin
    .doc("users/userId")
    .set(<User.Response>{...userResponse, role: "viewer"});
  await admin.doc("profiles/userId").set(profileGet);
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await admin.doc("spaces/spaceId/members/otherUserId").set(profileResponse);
  await admin
    .doc("spaces/otherSpaceId/members/otherUserId")
    .set(profileResponse);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Users can read", async done => {
  const docRef = db.doc("spaces/spaceId/members/otherUserId");
  await firebase.assertSucceeds(docRef.get());
  done();
});

test("Admins can read", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "admin"});
  await firebase.assertSucceeds(ref.get());
  done();
});

test("Moderators can read", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "moderator"});
  await firebase.assertSucceeds(ref.get());
  done();
});

test("Viewers can not read", async done => {
  const docRef = db.doc("spaces/otherSpaceId/members/otherUserId");
  await admin.doc("users/userId").set(<User.Update>{role: "viewer"});
  await firebase.assertFails(docRef.get());
  done();
});

test("Users can list 30 users", async done => {
  const colRef = db.collection("spaces/spaceId/members");
  await firebase.assertSucceeds(colRef.limit(30).get());
  done();
});

test("Users can not join a space", async done => {
  await admin.doc("spaces/spaceId/members/userId").delete();
  await firebase.assertFails(ref.set(profileResponse));
  done();
});

test("Users can leave a space", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Users can delete other users", async done => {
  const docRef = db.doc("spaces/spaceId/members/otherUserId");
  await firebase.assertFails(docRef.delete());
  done();
});

test("Users can not leave a space using a fake userId", async done => {
  const docRef = db.doc("spaces/spaceId/members/fakeUserId");
  await firebase.assertFails(docRef.delete());
  done();
});

test("Users can update description", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertSucceeds(ref.update(memberDescriptionUpdate));
  done();
});

test("Users can update emoji", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertSucceeds(ref.update(memberEmojiUpdate));
  done();
});

test("Users can not update role", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertFails(ref.update({...memberEmojiUpdate, role: "admin"}));
  done();
});

test("Admins can delete", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "admin"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Moderators can delete", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "moderator"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Viewers can not delete", async done => {
  await admin.doc("spaces/spaceId/members/userId").delete();
  await admin.doc("users/userId").set(<User.Update>{role: "viewer"});
  await firebase.assertFails(ref.delete());
  done();
});
