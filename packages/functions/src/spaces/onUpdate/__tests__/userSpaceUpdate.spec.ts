import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import userSpaceUpdate from "../userSpaceUpdate";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(Promise, "all").and.returnValue("updated");
});

test("On spaces update, update all user spaces on spaces update", async done => {
  const docs = [{id: "user1"}, {id: "user2"}, {id: "user3"}];
  spyOn(db.collection(""), "get").and.returnValue({docs});
  spyOn(db.doc(""), "update").and.returnValue("ref");

  const after = spaceResponse;
  const before = spaceResponse;
  const changes = {
    before: {data: (): Space.Response => before},
    after: {data: (): Space.Response => after, id: "spaceId"},
  };
  const wrapped = testEnv.wrap(userSpaceUpdate);
  const req = await wrapped(changes);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("spaces/spaceId/members");
  expect(db.doc).toHaveBeenCalledWith("users/user1/spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("users/user2/spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("users/user3/spaces/spaceId");
  expect(db.doc("").update).toHaveBeenCalledWith(after);
  expect(Promise.all).toHaveBeenCalledWith(["ref", "ref", "ref"]);
  done();
});
