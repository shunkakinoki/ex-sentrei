import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import scoreActions from "@sentrei/common/const/scoreActions";
import {
  activitySpaceResponseCreated,
  activitySpaceResponseDeleted,
  activitySpaceResponseUpdated,
  activityRoomResponseCreated,
  activityRoomResponseDeleted,
  activityRoomResponseUpdated,
} from "@sentrei/functions/__dummy__/Activity";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";

import Activity from "@sentrei/types/models/Activity";
import Metrics from "@sentrei/types/models/Metrics";

import scoreUserSet from "../scoreUserSet";

const testEnv = functions();
const db = admin.firestore();
const batch = db.batch();
const merge = true;

beforeEach(() => {
  jest.clearAllMocks();
  spyOn(batch, "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId")
    .mockReturnValue("userRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId")
    .mockReturnValue("memberRef");
});

test("Increase score when a space item is created", async done => {
  const snap = {
    data: (): Activity.CreateSpace => activitySpaceResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.created_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});

  done();
});

test("Increase score when a space item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");

  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});

  done();
});

test("Do not do anything when a space item is deleted", async done => {
  const snap = {
    data: (): Activity.DeleteSpace => activitySpaceResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("users/userId");
  expect(db.doc).not.toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(0);
  done();
});

test("Increase score when a room item is created", async done => {
  const snap = {
    data: (): Activity.CreateRoom => activityRoomResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");

  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});

  done();
});

test("Increase score when a room item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateRoom => activityRoomResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");

  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});

  done();
});

test("Decrease score when a room item is deleted by author", async done => {
  const snap = {
    data: (): Activity.DeleteRoom => activityRoomResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: -scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");

  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});

  done();
});

test("Decrease score when a room item is deleted by other user", async done => {
  const data: Activity.DeleteRoom = {
    ...activityRoomResponseDeleted,
    before: {...roomResponse, createdByUid: "otherUserId"},
  };
  const snap = {
    data: (): Activity.DeleteRoom => data,
  };
  const wrapped = testEnv.wrap(scoreUserSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.deleted_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledTimes(2);
  expect(batch.set).toHaveBeenCalledWith("userRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  done();
});
