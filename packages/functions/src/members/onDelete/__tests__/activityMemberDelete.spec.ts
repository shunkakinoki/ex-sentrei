import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityMemberResponseDeleted} from "@sentrei/functions/__dummy__/Activity";
import {viewerMemberResponse} from "@sentrei/functions/__dummy__/Member";
import Member from "@sentrei/types/models/Member";

import activityMemberDelete from "../activityMemberDelete";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new delete to activities", async done => {
  const snap = {
    data: (): Member.Response => viewerMemberResponse,
  };
  const context = {
    params: {spaceId: "spaceId", memberId: "userId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityMemberDelete);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityMemberResponseDeleted,
  );
  done();
});
