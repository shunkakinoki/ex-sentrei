import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";
import Stats from "@sentrei/types/models/Stats";

import roomStatsPlus from "../roomStatsPlus";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
});

test("Increase the activity count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/stats")
    .mockReturnValue("roomRef");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    collection: "activity",
    roomId: "roomId",
  };
  const wrapped = testEnv.wrap(roomStatsPlus);
  const req = await wrapped(snap, {params});
  const statsData = <Stats.Room>{activity: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("roomRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the analytics count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/stats")
    .mockReturnValue("roomRef");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    collection: "analytics",
    roomId: "roomId",
  };
  const wrapped = testEnv.wrap(roomStatsPlus);
  const req = await wrapped(snap, {params});
  const statsData = <Stats.Room>{analytics: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("roomRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the participants count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("admin/stats")
    .mockReturnValue("adminRef");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/stats")
    .mockReturnValue("roomRef");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    collection: "participants",
    roomId: "roomId",
  };
  const wrapped = testEnv.wrap(roomStatsPlus);
  const req = await wrapped(snap, {params});
  const statsData = <Stats.Room>{participants: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/stats");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("adminRef", statsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("roomRef", statsData, {
    merge: true,
  });
  done();
});

test("Increase the sessions count", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/stats")
    .mockReturnValue("roomRef");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    collection: "sessions",
    roomId: "roomId",
  };
  const wrapped = testEnv.wrap(roomStatsPlus);
  const req = await wrapped(snap, {params});
  const statsData = <Stats.Room>{sessions: 1};

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/stats");
  expect(db.batch().set).toHaveBeenCalledWith("roomRef", statsData, {
    merge: true,
  });
  done();
});
