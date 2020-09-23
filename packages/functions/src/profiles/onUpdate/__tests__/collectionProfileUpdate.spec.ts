import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {profileResponse} from "@sentrei/functions/__dummy__/Profile";
import Profile from "@sentrei/types/models/Profile";

import collectionProfileUpdate from "../collectionProfileUpdate";

const testEnv = functions();
const db = admin.firestore();

const change = {
  before: {data: (): {} => ({})},
  after: {
    data: (): Profile.Response => profileResponse,
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

test("Return when the data did not change", async done => {
  const noChange = {
    before: {
      data: (): Profile.Response => profileResponse,
    },
    after: {
      data: (): Profile.Response => profileResponse,
    },
  };

  const wrapped = testEnv.wrap(collectionProfileUpdate);
  const req = await wrapped(noChange, {params: {profileId: "userId"}});

  expect(req).toBe(false);
  done();
});

test("Should update the profile for all collections", async done => {
  spyOn(Promise, "all").and.returnValue("updated");
  spyOn(db.collection("").where("", "==", ""), "get").and.returnValue({
    docs: [
      {ref: {update: jest.fn().mockReturnValue("doc1")}},
      {ref: {update: jest.fn().mockReturnValue("doc2")}},
    ],
  });

  const wrapped = testEnv.wrap(collectionProfileUpdate);
  const req = await wrapped(change, {params: {profileId: "userId"}});

  const spy1 = (await db.collection("").where("", "==", "").get()).docs[0].ref
    .update;
  const spy2 = (await db.collection("").where("", "==", "").get()).docs[1].ref
    .update;

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("rooms");
  expect(db.collection).toHaveBeenCalledWith("spaces");
  expect(db.collection("").where).toHaveBeenCalledWith(
    "createdByUid",
    "==",
    "userId",
  );
  expect(db.collection("").where).toHaveBeenCalledWith(
    "updatedByUid",
    "==",
    "userId",
  );
  expect(spy1).toHaveBeenCalledWith({createdBy: profileResponse});
  expect(spy2).toHaveBeenCalledWith({updatedBy: profileResponse});
  expect(spy1).toHaveBeenCalledTimes(4);
  expect(spy2).toHaveBeenCalledTimes(4);
  expect(Promise.all).toHaveBeenCalledWith(["doc1", "doc2"]);
  done();
});
