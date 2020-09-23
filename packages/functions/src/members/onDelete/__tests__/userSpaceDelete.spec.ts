import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import userSpaceDelete from "../userSpaceDelete";

const testEnv = functions();
const db = admin.firestore();

test("On members delete, delete the user item spaces", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const params = {spaceId: "spaceId", memberId: "userId"};
  const wrapped = testEnv.wrap(userSpaceDelete);
  const req = await wrapped({}, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith("users/userId/spaces/spaceId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
