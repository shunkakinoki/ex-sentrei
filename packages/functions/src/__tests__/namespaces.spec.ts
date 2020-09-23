import * as firebase from "@firebase/testing";

import {userNamespace} from "@sentrei/functions/__dummy__/Namespace";
import Namespace from "@sentrei/types/models/Namespace";

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
  collection = db.collection("namespaces");
  doc = collection.doc("sentrei");
  await loadFirestoreRules();
  await admin
    .doc("namespaces/sentrei")
    .set(<Namespace>{...userNamespace, uid: "otherUserId"});
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Namespaces can read a single namespace", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Namespaces can not list namespaces", async done => {
  await firebase.assertFails(collection.get());
  done();
});

test("Everyone can create", async done => {
  const ref = collection.doc("newuser");
  await firebase.assertSucceeds(ref.set(<Namespace>userNamespace));
  done();
});

test("Namespaces can not create for anonymous users ", async done => {
  const app = initializeFirebaseApp(undefined);
  const ref = app.collection("namespaces");
  await firebase.assertFails(ref.add(<Namespace>{uid: null}));
  done();
});

test("Namespaces can not create using the userId of other users", async done => {
  await firebase.assertFails(collection.add(<Namespace>{uid: "otherUserId"}));
  done();
});

test("Namespaces can not have a dot at the beginning", async done => {
  const ref = collection.doc(".namespaceId");
  await firebase.assertFails(ref.set(<Namespace>{uid: "userId"}));
  done();
});

test("Namespaces can not have a dot at the end", async done => {
  const ref = collection.doc("namespaceId.");
  await firebase.assertFails(ref.set(<Namespace>{uid: "userId"}));
  done();
});

test("Namespaces can not have two dots in a row", async done => {
  const ref = collection.doc("name..spaceId");
  await firebase.assertFails(ref.set(<Namespace>{uid: "userId"}));
  done();
});

test("Namespaces can not have an underscore at the beginning", async done => {
  const ref = collection.doc("_namespaceId");
  await firebase.assertFails(ref.set(<Namespace>{uid: "userId"}));
  done();
});

test("Namespaces can have numbers", async done => {
  const ref = collection.doc("123");
  await firebase.assertSucceeds(ref.set(userNamespace));
  done();
});

test("Namespaces can not update using the userId of other users", async done => {
  await firebase.assertFails(doc.update(<Namespace>{uid: "otherUserId"}));
  done();
});

test("Namespaces can not delete", async done => {
  await firebase.assertFails(doc.delete());
  done();
});
