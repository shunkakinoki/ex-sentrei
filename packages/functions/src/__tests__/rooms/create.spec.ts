import * as firebase from "@firebase/testing";

import {userNamespace} from "@sentrei/functions/__dummy__/Namespace";
import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomCreate} from "@sentrei/functions/__dummy__/Room";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.CollectionReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{
    uid: userNamespace.uid,
  });
  ref = db.collection("rooms");
  await loadFirestoreRules();
  await admin.doc("spaces/spaceId/members/userId").set(profileGet);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can create", async done => {
  await firebase.assertSucceeds(ref.add(<Room.Create>roomCreate));
  done();
});

test("Anonymous users can not create", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.collection("rooms");
  await firebase.assertFails(newRef.add(<Room.Create>roomCreate));
  done();
});

test("CreatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...roomCreate, createdAt: new Date()}));
  done();
});

test("CreatedBy has a valid name", async done => {
  const createdBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedBy has a valid photo", async done => {
  const createdBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedBy has a valid namespace", async done => {
  const createdBy: Profile.Get = {...profileGet, namespaceId: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedByUid has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Room.Create>{...roomCreate, createdByUid: "other"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertFails(ref.add({...roomCreate, description: 123}));
  await firebase.assertFails(ref.add({...roomCreate, description: true}));
  await firebase.assertFails(
    ref.add({...roomCreate, description: ["description"]}),
  );
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, description: null}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, color: "color"}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...roomCreate, updatedAt: new Date()}));
  done();
});

test("UpdatedBy has a valid name", async done => {
  const updatedBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid photo", async done => {
  const updatedBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid namespace", async done => {
  const updatedBy: Profile.Get = {...profileGet, namespaceId: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedByUid has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Room.Create>{...roomCreate, updatedByUid: "otherUserId"}),
  );
  done();
});
