import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import userSpaceSet from "../userSpaceSet";

const testEnv = functions();
const db = admin.firestore();

test("On members create, update space to set a user's spaces", async done => {
  spyOn(db.doc(""), "set").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => spaceResponse});

  const params = {spaceId: "spaceId", memberId: "userId"};
  const snap = {
    data: (): Space.Response => spaceResponse,
  };
  const wrapped = testEnv.wrap(userSpaceSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("users/userId/spaces/spaceId");
  expect(db.doc("").set).toHaveBeenCalledWith(spaceResponse);
  done();
});
