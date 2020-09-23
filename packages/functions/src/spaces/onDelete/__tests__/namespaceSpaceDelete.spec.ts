import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import namespaceSpaceDelete from "../namespaceSpaceDelete";

const testEnv = functions();
const db = admin.firestore();

test("On space delete, update namespace to delete a space's namespace", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const params = {spaceId: "spaceId"};
  const snap = {
    data: (): Space.Response => spaceResponse,
  };
  const wrapped = testEnv.wrap(namespaceSpaceDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith("namespaces/namespaceId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
