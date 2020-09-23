import * as firebase from "@firebase/testing";

import {
  activityRoomResponseCreated,
  activitySpaceResponseCreated,
  activitySpaceResponseUpdated,
} from "@sentrei/functions/__dummy__/Activity";
import {userNamespace} from "@sentrei/functions/__dummy__/Namespace";
import {spaceUpdate} from "@sentrei/functions/__dummy__/Space";

import Activity from "@sentrei/types/models/Activity";
import Namespace from "@sentrei/types/models/Namespace";
import Space from "@sentrei/types/models/Space";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "../helpers/testHelpers";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let collection: firebase.firestore.CollectionReference;
let doc: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{
    uid: userNamespace.uid,
  });
  collection = db.collection("activity");
  doc = collection.doc("itemId");
  await loadFirestoreRules();
  await admin
    .doc("activity/activityId")
    .set(<Activity.CreateSpace>activitySpaceResponseCreated);
  await admin.doc("spaces/spaceId").set(<Space.Create>spaceUpdate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Users can not create a new activity", async done => {
  await firebase.assertFails(
    collection.add(<Activity.CreateRoom>activityRoomResponseCreated),
  );
  done();
});

test("Users can not update activity", async done => {
  await firebase.assertFails(
    doc.update(<Activity.UpdateSpace>activitySpaceResponseUpdated),
  );
  done();
});

test("Users can not delete an activity", async done => {
  await firebase.assertFails(doc.delete());
  done();
});

test("Users can not get an activity", async done => {
  await firebase.assertFails(doc.get());
  done();
});

test("Users can list activities", async done => {
  const ref = collection.limit(30);
  await firebase.assertSucceeds(ref.get());
  done();
});

test("Users can not list more than 30 activities", async done => {
  const ref = collection.limit(31);
  await firebase.assertFails(ref.get());
  done();
});
