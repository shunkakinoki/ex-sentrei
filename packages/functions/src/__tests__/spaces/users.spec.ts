import * as firebase from "@firebase/testing";

import {spaceCreate} from "@sentrei/functions/__dummy__/Space";
import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";
import Space from "@sentrei/types/models/Space";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let collection: firebase.firestore.CollectionReference;
let doc: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{uid: "userId"});
  collection = db.collection("users/userId/spaces");
  doc = collection.doc("spaceId");
  await loadFirestoreRules();
  await admin.doc("users/userId/spaces/spaceId").set(spaceCreate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Users can not add a new space item", async done => {
  await firebase.assertFails(collection.add(<Space.Update>{name: "space"}));
  done();
});

test("Users can not update a space item", async done => {
  await firebase.assertFails(doc.update(<Space.Update>{name: "space"}));
  done();
});

test("Users can not delete a space item", async done => {
  await firebase.assertFails(doc.delete());
  done();
});

test("Users can read a space item", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Users can not read a space item from other users", async done => {
  const ref = db.doc("users/otherUserId/spaces/spaceId");
  await firebase.assertFails(ref.get());
  done();
});

test("Users can list their own space items", async done => {
  await firebase.assertSucceeds(collection.get());
  done();
});

test("Users can not list space items from other users", async done => {
  const ref = db.collection("users/otherUserId/spaces");
  await firebase.assertFails(ref.get());
  done();
});
