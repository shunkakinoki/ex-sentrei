import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Nameroom from "@sentrei/types/models/Nameroom";

import nameroomBatchDelete from "../nameroomBatchDelete";

const testEnv = functions();
const db = admin.firestore();

test("Remove all older namerooms from the database", async done => {
  const namerooms = [
    {id: "1", ref: "1"},
    {id: "2", ref: "2"},
    {id: "3", ref: "3"},
  ];

  spyOn(db.batch(), "commit").and.returnValue("updated");
  spyOn(db.collection("").where("", "==", ""), "get").and.returnValue({
    docs: namerooms,
  });

  const snap = {
    id: "2",
    data: (): Nameroom => ({uid: "roomId"}),
  };
  const params = {
    spaceId: "spaceId",
  };
  const wrapped = testEnv.wrap(nameroomBatchDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("spaces/spaceId/namerooms");
  expect(db.collection("").where).toHaveBeenCalledWith("uid", "==", "roomId");
  expect(db.batch().delete).toHaveBeenCalledWith("1");
  expect(db.batch().delete).not.toHaveBeenCalledWith("2");
  expect(db.batch().delete).toHaveBeenCalledWith("3");
  done();
});
