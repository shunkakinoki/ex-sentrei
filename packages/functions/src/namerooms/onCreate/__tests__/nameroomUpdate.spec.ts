import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Nameroom from "@sentrei/types/models/Nameroom";
import Profile from "@sentrei/types/models/Profile";

import nameroomUpdate from "../nameroomUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Update the nameroom field in the rooms collection", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const snap = {
    id: "nameroomId",
    data: (): Nameroom => ({uid: "roomId"}),
  };
  const wrapped = testEnv.wrap(nameroomUpdate);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Profile.Update>{
    nameroomId: "nameroomId",
  });
  done();
});
