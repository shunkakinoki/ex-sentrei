import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {profileResponse} from "@sentrei/functions/__dummy__/Profile";
import Profile from "@sentrei/types/models/Profile";

import memberProfileUpdate from "../memberProfileUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Return when the data did not change", async done => {
  const noChange = {
    before: {
      data: (): Profile.Response => profileResponse,
    },
    after: {
      data: (): Profile.Response => profileResponse,
    },
  };

  const wrapped = testEnv.wrap(memberProfileUpdate);
  const req = await wrapped(noChange, {params: {profileId: "userId"}});

  expect(req).toBe(false);
  done();
});

test("Update the public profile when user settings change", async done => {
  spyOn(Promise, "all").and.returnValue("updated");
  spyOn(db.collectionGroup("").where("", "==", ""), "get").and.returnValue({
    docs: [
      {ref: {update: jest.fn().mockReturnValue("doc1")}},
      {ref: {update: jest.fn().mockReturnValue("doc2")}},
    ],
  });

  const change = {
    before: {data: (): {} => ({namespaceId: "namespaceId"})},
    after: {
      data: (): Profile.Response => profileResponse,
    },
  };

  const wrapped = testEnv.wrap(memberProfileUpdate);
  const req = await wrapped(change, {params: {profileId: "userId"}});
  const spy1 = (await db.collectionGroup("").where("", "==", "").get()).docs[0]
    .ref.update;
  const spy2 = (await db.collectionGroup("").where("", "==", "").get()).docs[1]
    .ref.update;

  expect(req).toBe("updated");
  expect(db.collectionGroup).toHaveBeenCalledWith("members");
  expect(db.collectionGroup("").where("uid", "==", "userId"));
  expect(spy1).toHaveBeenCalledWith(profileResponse);
  expect(spy2).toHaveBeenCalledWith(profileResponse);
  expect(Promise.all).toHaveBeenCalledWith(["doc1", "doc2"]);
  done();
});
