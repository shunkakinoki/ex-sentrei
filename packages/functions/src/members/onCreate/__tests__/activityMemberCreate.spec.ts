import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityMemberResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {viewerMemberResponse} from "@sentrei/functions/__dummy__/Member";
import Member from "@sentrei/types/models/Member";

import activityMemberCreate from "../activityMemberCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new member to activities", async done => {
  const snap = {
    data: (): Member.Response => viewerMemberResponse,
  };
  const context = {
    params: {spaceId: "spaceId", memberId: "userId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityMemberCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityMemberResponseCreated,
  );
  done();
});
