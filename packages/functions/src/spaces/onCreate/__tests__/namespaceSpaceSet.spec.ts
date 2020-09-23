import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {spaceNamespace} from "@sentrei/functions/__dummy__/Namespace";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import namespaceSpaceSet from "../namespaceSpaceSet";

const testEnv = functions();
const db = admin.firestore();

test("On space create, update namespace to set a space's namespace", async done => {
  spyOn(db.doc(""), "set").and.returnValue("created");
  spyOn(db.doc(""), "get").and.returnValue({data: () => spaceResponse});

  const params = {spaceId: "spaceId"};
  const snap = {
    data: (): Space.Response => spaceResponse,
  };
  const wrapped = testEnv.wrap(namespaceSpaceSet);
  const req = await wrapped(snap, {params});
  expect(req).toBe("created");
  expect(db.doc).toHaveBeenCalledWith("namespaces/namespaceId");
  expect(db.doc("").set).toHaveBeenCalledWith(spaceNamespace);
  done();
});
