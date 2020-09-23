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

import scoreBatchSet from "../scoreBatchSet";

const testEnv = functions();
const db = admin.firestore();
const batch = db.batch();
const merge = true;

beforeEach(() => {
  jest.clearAllMocks();
  spyOn(batch, "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId/admin/metrics")
    .mockReturnValue("usersRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId/admin/metrics")
    .mockReturnValue("memberRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/metrics")
    .mockReturnValue("roomRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/metrics")
    .mockReturnValue("spaceRef");
});

test("Increase score when a space item is created", async done => {
  const snap = {
    data: (): Activity.CreateSpace => activitySpaceResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.created_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(3);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
  done();
});

test("Increase score when a space item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(3);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
  done();
});

test("Do not do anything when a space item is deleted", async done => {
  const snap = {
    data: (): Activity.DeleteSpace => activitySpaceResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).not.toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).not.toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(0);
  done();
});

test("Increase score when a room item is created", async done => {
  const snap = {
    data: (): Activity.CreateRoom => activityRoomResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(4);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("roomRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
  done();
});

test("Increase score when a room item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateRoom => activityRoomResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(4);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("roomRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
  done();
});

test("Decrease score when a room item is deleted by author", async done => {
  const snap = {
    data: (): Activity.DeleteRoom => activityRoomResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: -scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(4);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("roomRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
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
  const wrapped = testEnv.wrap(scoreBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    score: scoreActions.deleted_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.doc).toHaveBeenCalledTimes(4);
  expect(batch.set).toHaveBeenCalledWith("usersRef", metricsData, {
    merge,
  });
  expect(batch.set).toHaveBeenCalledWith("memberRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("roomRef", metricsData, {merge});
  expect(batch.set).toHaveBeenCalledWith("spaceRef", metricsData, {merge});
  done();
});
