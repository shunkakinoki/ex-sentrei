import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import Stats from "@sentrei/types/models/Stats";

import rootStatsMinus from "../rootStatsMinus";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
});

test("Decrease the activity count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "activity"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{activity: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the analytics count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "analytics"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{analytics: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the feedback count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "feedback"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{feedback: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the namespaces count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "namespaces"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{namespaces: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the notifications count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "notifications"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{notifications: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the profiles count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "profiles"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{profiles: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the rooms count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "rooms"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{rooms: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the sessions count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "sessions"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{sessions: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the spaces count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "spaces"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{spaces: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});

test("Decrease the users count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");

  const context = {params: {collection: "users"}};
  const wrapped = testEnv.wrap(rootStatsMinus);
  const req = await wrapped({}, context);
  const statsData = <Stats.Root>{users: -1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  done();
});
