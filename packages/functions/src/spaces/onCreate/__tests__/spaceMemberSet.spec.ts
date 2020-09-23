import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {adminMemberResponse} from "@sentrei/functions/__dummy__/Member";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";

import spaceMemberSet from "../spaceMemberSet";

const testEnv = functions();
const db = admin.firestore();

test("On spaces create, add the space creator to the member list", async done => {
  spyOn(db.doc(""), "set").and.returnValue("updated");

  const snap = {
    data: (): Space.Response => spaceResponse,
    id: "spaceId",
  };
  const wrapped = testEnv.wrap(spaceMemberSet);
  const req = await wrapped(snap);
  const expected: Member.Create = {
    ...adminMemberResponse,
    uid: "userId",
  };

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc("").set).toHaveBeenCalledWith(expected);
  done();
});
