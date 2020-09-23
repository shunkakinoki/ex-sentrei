import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

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

import scoreRootSet from "../scoreRootSet";

const testEnv = functions();
const db = admin.firestore();
const merge = true;

test("Increase score when a space item is created", async done => {
  const snap = {
    data: (): Activity.CreateSpace => activitySpaceResponseCreated,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: scoreActions.created_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
  done();
});

test("Increase score when a space item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
  done();
});

test("Do not do anything when a space item is deleted", async done => {
  const snap = {
    data: (): Activity.DeleteSpace => activitySpaceResponseDeleted,
  };
  const params = {activityId: "activityId"};

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe(false);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  done();
});

test("Increase score when a room item is created", async done => {
  const snap = {
    data: (): Activity.CreateRoom => activityRoomResponseCreated,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
  done();
});

test("Increase score when a room item is updated", async done => {
  const snap = {
    data: (): Activity.UpdateRoom => activityRoomResponseUpdated,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: scoreActions.updated_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
  done();
});

test("Decrease score when a room item is deleted by author", async done => {
  const snap = {
    data: (): Activity.DeleteRoom => activityRoomResponseDeleted,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: -scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
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
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(scoreRootSet);
  const req = await wrapped(snap, {params});
  const metricsData: Metrics.Update = {
    score: scoreActions.deleted_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {
    merge,
  });
  done();
});
