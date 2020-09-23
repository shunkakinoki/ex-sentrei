import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityInviteResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {emailInviteResponse} from "@sentrei/functions/__dummy__/Invite";
import Invite from "@sentrei/types/models/Invite";

import activityInviteCreate from "../activityInviteCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new invite to activities", async done => {
  const snap = {
    data: (): Invite.Response => emailInviteResponse,
  };
  const context = {
    params: {spaceId: "spaceId", inviteId: "inviteId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityInviteCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityInviteResponseCreated,
  );
  done();
});
