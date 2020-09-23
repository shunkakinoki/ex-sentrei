import * as firebase from "@firebase/testing";

import {
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";

let db: firebase.firestore.Firestore;

beforeAll(async done => {
  db = initializeFirebaseApp(<Namespace>{uid: "userId"});
  await loadFirestoreRules();
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("User can get space item", async done => {
  const docRef = db.doc("spaces/spaceId");
  await firebase.assertSucceeds(docRef.get());
  done();
});

test("User can not list space items", async done => {
  const colRef = db.collection("spaces");
  await firebase.assertFails(colRef.get());
  done();
});
