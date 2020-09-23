import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {when} from "jest-when";

import Stats from "@sentrei/types/models/Stats";

import spaceStatsPlus from "../spaceStatsPlus";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
});

test("Increase the activity count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "activity",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{activity: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the analytics count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "analytics",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{analytics: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the invites count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "invites",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{invites: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the members count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "members",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{members: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the rooms count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "rooms",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{rooms: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the sessions count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/stats")
    .mockReturnValue("spaceRef");

  const context = {
    params: {
      spaceId: "spaceId",
      collection: "sessions",
    },
  };
  const wrapped = testEnv.wrap(spaceStatsPlus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Space>{sessions: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", statsData, {
    merge: true,
  });
  done();
});
