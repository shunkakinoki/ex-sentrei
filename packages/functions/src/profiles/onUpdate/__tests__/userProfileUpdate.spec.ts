import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {profileResponse} from "@sentrei/functions/__dummy__/Profile";
import Profile from "@sentrei/types/models/Profile";

import userProfileUpdate from "../userProfileUpdate";

const testEnv = functions();
const db = admin.firestore();

const change = {
  before: {data: (): {} => ({})},
  after: {
    data: (): Profile.Response => profileResponse,
  },
};

test("Return when the data did not change", async done => {
  const noChange = {
    before: {
      data: (): Profile.Response => profileResponse,
    },
    after: {
      data: (): Profile.Response => profileResponse,
    },
  };

  const wrapped = testEnv.wrap(userProfileUpdate);
  const req = await wrapped(noChange, {params: {profileId: "testUserId"}});

  expect(req).toBe(false);
  done();
});

test("Update the public profile when user settings change", async done => {
  spyOn(db.doc(""), "update").and.returnValue("settings");

  const wrapped = testEnv.wrap(userProfileUpdate);
  const req = await wrapped(change, {params: {profileId: "testUserId"}});

  expect(db.doc).toHaveBeenCalledWith("users/testUserId");
  expect(db.doc("").update).toHaveBeenCalledWith(profileResponse);
  expect(req).toBe("settings");
  done();
});
