import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import userSpaceDelete from "../userSpaceDelete";

const testEnv = functions();
const db = admin.firestore();

test("On spaces delete, delete user spaces on delete spaces", async done => {
  const docs = [{id: "user1"}, {id: "user2"}, {id: "user3"}];
  spyOn(Promise, "all").and.returnValue("updated");
  spyOn(db.collection(""), "get").and.returnValue({docs});
  spyOn(db.doc(""), "delete").and.returnValue("ref");

  const snap = {id: "spaceId"};
  const wrapped = testEnv.wrap(userSpaceDelete);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("spaces/spaceId/members");
  expect(db.doc).toHaveBeenCalledWith("users/user1/spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("users/user2/spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("users/user3/spaces/spaceId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(3);
  expect(Promise.all).toHaveBeenCalledWith(["ref", "ref", "ref"]);
  done();
});
