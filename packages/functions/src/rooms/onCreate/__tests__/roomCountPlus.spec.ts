import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Space from "@sentrei/types/models/Space";

import roomCountPlus from "../roomCountPlus";

const testEnv = functions();
const db = admin.firestore();

test("On room item create, increase the space roomCount", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const params = {spaceId: "spaceId"};
  const wrapped = testEnv.wrap(roomCountPlus);
  const req = await wrapped({}, {params});

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Space.AdminUpdate>{
    roomCount: 1,
  });
  done();
});
