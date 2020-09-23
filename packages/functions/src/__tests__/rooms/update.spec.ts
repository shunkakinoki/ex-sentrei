import * as firebase from "@firebase/testing";

import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomUpdate} from "@sentrei/functions/__dummy__/Room";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp({uid: "userId"});
  ref = db.doc("rooms/roomId");
  await loadFirestoreRules();
  await admin.doc("profiles/userId").set(profileGet);
  await admin.doc("rooms/roomId").set(<Room.Create>roomUpdate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can update", async done => {
  await firebase.assertSucceeds(ref.update(<Room.Update>roomUpdate));
  done();
});

test("Unauthenticated users can not update", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.doc("rooms/roomId");
  await firebase.assertFails(newRef.update(<Room.Create>roomUpdate));
  done();
});

test("CreatedAt can not be changed", async done => {
  const changes = {
    ...roomUpdate,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await firebase.assertFails(ref.update(<Room.Update>changes));
  done();
});

test("CreatedBy can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, createdBy: "newUserId"}),
  );
  done();
});

test("CreatedByUid can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, createdByUid: "otherUserId"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertSucceeds(
    ref.update({...roomUpdate, description: "description"}),
  );
  await firebase.assertFails(ref.update({...roomUpdate, description: 123}));
  await firebase.assertFails(ref.update({...roomUpdate, description: true}));
  await firebase.assertFails(
    ref.update({...roomUpdate, description: ["test"]}),
  );
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.update(<Room.Create>{...roomUpdate, description: null}),
  );
  done();
});

test("Emoji is a string", async done => {
  await firebase.assertSucceeds(
    ref.update(<Room.Update>{...roomUpdate, emoji: "emoji"}),
  );
  done();
});

test("MemberCount can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, memberCount: 1}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(
    ref.update({...roomUpdate, updatedAt: new Date()}),
  );
  done();
});

test("UpdatedBy has a valid name", async done => {
  const updatedBy: Profile.Response = {...profileGet, name: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid photo", async done => {
  const updatedBy: Profile.Response = {...profileGet, photo: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid namespaceId", async done => {
  const updatedBy: Profile.Response = {...profileGet, namespaceId: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedByUid has the current user userId", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedByUid: "otherUserId"}),
  );
  done();
});
