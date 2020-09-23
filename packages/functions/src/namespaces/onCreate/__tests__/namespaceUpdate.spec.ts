import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Namespace from "@sentrei/types/models/Namespace";
import Profile from "@sentrei/types/models/Profile";

import profileUpdate from "../namespaceUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Update the namespace field in the profile collection", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const snap = {
    id: "namespaceId",
    data: (): Namespace => ({uid: "userId", model: "user"}),
  };
  const wrapped = testEnv.wrap(profileUpdate);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("profiles/userId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Profile.Update>{
    namespaceId: "namespaceId",
  });
  done();
});

test("Update the namespace field in the spaces collection", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const snap = {
    id: "namespaceId",
    data: (): Namespace => ({uid: "spaceId", model: "space"}),
  };
  const wrapped = testEnv.wrap(profileUpdate);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Profile.Update>{
    namespaceId: "namespaceId",
  });
  done();
});
