import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Space from "@sentrei/types/models/Space";

import memberCountPlus from "../memberCountPlus";

const testEnv = functions();
const db = admin.firestore();

test("On space item create, increase the space memberCount", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const params = {spaceId: "spaceId"};
  const wrapped = testEnv.wrap(memberCountPlus);
  const req = await wrapped({}, {params});

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Space.AdminUpdate>{
    memberCount: 1,
  });
  done();
});
