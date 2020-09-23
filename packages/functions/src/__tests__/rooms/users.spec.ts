import * as firebase from "@firebase/testing";

import {roomCreate} from "@sentrei/functions/__dummy__/Room";
import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";
import Room from "@sentrei/types/models/Room";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let collection: firebase.firestore.CollectionReference;
let doc: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{uid: "userId"});
  collection = db.collection("users/userId/rooms");
  doc = collection.doc("roomId");
  await loadFirestoreRules();
  await admin.doc("users/userId/rooms/roomId").set(roomCreate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Users can not add a new room item", async done => {
  await firebase.assertFails(collection.add(<Room.Update>{name: "room"}));
  done();
});

test("Users can not update a room item", async done => {
  await firebase.assertFails(doc.update(<Room.Update>{name: "room"}));
  done();
});

test("Users can not delete a room item", async done => {
  await firebase.assertFails(doc.delete());
  done();
});

test("Users can read a room item", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Users can not read a room item from other users", async done => {
  const ref = db.doc("users/otherUserId/rooms/roomId");
  await firebase.assertFails(ref.get());
  done();
});

test("Users can list their own room items", async done => {
  await firebase.assertSucceeds(collection.get());
  done();
});

test("Users can not list room items from other users", async done => {
  const ref = db.collection("users/otherUserId/rooms");
  await firebase.assertFails(ref.get());
  done();
});
