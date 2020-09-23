import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {userNamespace} from "@sentrei/functions/__dummy__/Namespace";
import {profileResponse} from "@sentrei/functions/__dummy__/Profile";
import {userResponseInitial} from "@sentrei/functions/__dummy__/User";

import userBatchSet from "../userBatchSet";

const testEnv = functions();

const db = admin.firestore();

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("namespaces/userId")
    .mockReturnValue({path: "namespaces/userId"})
    .calledWith("users/userId")
    .mockReturnValue({path: "users/userId"})
    .calledWith("profiles/userId")
    .mockReturnValue({path: "profiles/userId"});
});

test("Add the namespace data to their user", async done => {
  const spy = spyOn(db.batch(), "set");
  const ref = db.doc("namespaces/userId");

  const wrapped = testEnv.wrap(userBatchSet);
  await wrapped(<admin.auth.UserRecord>{
    uid: "userId",
  });

  expect(spy).toHaveBeenCalledWith(ref, userNamespace, {merge: true});
  done();
});

test("Add the user data to their user", async done => {
  const spy = spyOn(db.batch(), "set");
  const ref = db.doc("users/userId");

  const wrapped = testEnv.wrap(userBatchSet);
  await wrapped(<admin.auth.UserRecord>{
    email: "user@sentrei.com",
    uid: "userId",
  });

  expect(spy).toHaveBeenCalledWith(ref, userResponseInitial, {merge: true});
  done();
});

test("Add the profile data to their profile", async done => {
  const spy = spyOn(db.batch(), "set");
  const ref = db.doc("profiles/userId");

  const wrapped = testEnv.wrap(userBatchSet);
  await wrapped(<admin.auth.UserRecord>{
    displayName: "profileUser",
    email: "user@sentrei.com",
    photoURL: null,
    uid: "userId",
  });

  expect(spy).toHaveBeenCalledWith(ref, profileResponse, {merge: true});
  done();
});

test("On users create, batch commit all set changes to the database", async done => {
  const setSpy = spyOn(db.batch(), "set");
  spyOn(db.batch(), "commit").and.returnValue(true);

  const wrapped = testEnv.wrap(userBatchSet);
  const req = await wrapped(<admin.auth.UserRecord>{
    email: "user@sentrei.com",
    uid: "userId",
  });

  expect(setSpy).toHaveBeenCalledTimes(3);
  expect(req).toBe(true);
  done();
});
