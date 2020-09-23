import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Namespace from "@sentrei/types/models/Namespace";

import namespaceBatchDelete from "../namespaceBatchDelete";

const testEnv = functions();
const db = admin.firestore();

test("Remove all older namespaces from the database", async done => {
  const namespaces = [
    {id: "1", ref: "1"},
    {id: "2", ref: "2"},
    {id: "3", ref: "3"},
  ];

  spyOn(db.batch(), "commit").and.returnValue("updated");
  spyOn(db.collection("").where("", "==", ""), "get").and.returnValue({
    docs: namespaces,
  });

  const snap = {
    id: "2",
    data: (): Namespace => ({uid: "userId", model: "user"}),
  };
  const wrapped = testEnv.wrap(namespaceBatchDelete);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("namespaces");
  expect(db.collection("").where).toHaveBeenCalledWith("uid", "==", "userId");
  expect(db.batch().delete).toHaveBeenCalledWith("1");
  expect(db.batch().delete).not.toHaveBeenCalledWith("2");
  expect(db.batch().delete).toHaveBeenCalledWith("3");
  done();
});
