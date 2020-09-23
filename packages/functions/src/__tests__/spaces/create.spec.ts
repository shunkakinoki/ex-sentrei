import * as firebase from "@firebase/testing";

import {userNamespace} from "@sentrei/functions/__dummy__/Namespace";
import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {spaceCreate} from "@sentrei/functions/__dummy__/Space";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Namespace from "@sentrei/types/models/Namespace";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.CollectionReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Namespace>{
    uid: userNamespace.uid,
  });
  ref = db.collection("spaces");
  await loadFirestoreRules();
  await admin.doc("profiles/userId").set(profileGet);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can create", async done => {
  await firebase.assertSucceeds(ref.add(<Space.Create>spaceCreate));
  done();
});

test("Anonymous users can not create", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.collection("spaces");
  await firebase.assertFails(newRef.add(<Space.Create>spaceCreate));
  done();
});

test("CreatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...spaceCreate, createdAt: new Date()}));
  done();
});

test("CreatedBy has a valid name", async done => {
  const createdBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedBy has a valid photo", async done => {
  const createdBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedBy has a valid namespaceId", async done => {
  const createdBy: Profile.Get = {...profileGet, namespaceId: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedByUid has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdByUid: "otherUserId"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, description: "description"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, description: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, description: true}));
  await firebase.assertFails(
    ref.add({...spaceCreate, description: ["description"]}),
  );
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, description: null}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, photo: "photo"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, photo: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, photo: true}));
  await firebase.assertFails(ref.add({...spaceCreate, photo: ["photo"]}));
  done();
});

test("Photo can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, photo: null}),
  );
  done();
});

test("Name is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, name: "name"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, name: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, name: true}));
  await firebase.assertFails(ref.add({...spaceCreate, name: ["name"]}));
  done();
});

test("Name can not be null", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, name: null}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...spaceCreate, updatedAt: new Date()}));
  done();
});

test("UpdatedBy has a valid name", async done => {
  const updatedBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid photo", async done => {
  const updatedBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid namespace", async done => {
  const updatedBy: Profile.Get = {...profileGet, namespaceId: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedByUid has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, updatedByUid: "other"}),
  );
  done();
});
