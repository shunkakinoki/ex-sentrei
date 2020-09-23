import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityMemberResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import {viewerMemberResponse} from "@sentrei/functions/__dummy__/Member";
import Activity from "@sentrei/types/models/Activity";
import Member from "@sentrei/types/models/Member";

import activityMemberUpdate from "../activityMemberUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Return when there are no changes", async done => {
  const after = {
    data: (): Member.Response => viewerMemberResponse,
  };
  const before = {
    data: (): Member.Response => viewerMemberResponse,
  };
  const changes = {after, before};
  const context = {
    params: {spaceId: "spaceId", memberId: "userId"},
  };
  const wrapped = testEnv.wrap(activityMemberUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalled();
  expect(db.collection).not.toHaveBeenCalled();
  done();
});

test("Invoke a request to add a new member to after editing emoji", async done => {
  const afterData: Member.Response = {
    ...viewerMemberResponse,
    emoji: "new",
  };
  const beforeData: Member.Response = {
    ...viewerMemberResponse,
    emoji: "old",
  };
  const after = {
    data: (): Member.Response => afterData,
  };
  const before = {
    data: (): Member.Response => beforeData,
  };

  const changes = {after, before};
  const context = {
    params: {spaceId: "spaceId", memberId: "userId"},
  };

  const expected: Activity.UpdateMember = {
    ...activityMemberResponseUpdated,
    action: "updated",
    category: "members",
    after: afterData,
    before: beforeData,
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityMemberUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});

test("Invoke a request to add a new member after editing description", async done => {
  const afterData: Member.Response = {
    ...viewerMemberResponse,
    description: "new",
  };
  const beforeData: Member.Response = {
    ...viewerMemberResponse,
    description: "old",
  };
  const after = {
    data: (): Member.Response => afterData,
  };
  const before = {
    data: (): Member.Response => beforeData,
  };

  const changes = {after, before};
  const context = {
    params: {spaceId: "spaceId", memberId: "userId"},
  };
  const expected: Activity.UpdateMember = {
    ...activityMemberResponseUpdated,
    action: "updated",
    category: "members",
    after: afterData,
    before: beforeData,
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityMemberUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});
