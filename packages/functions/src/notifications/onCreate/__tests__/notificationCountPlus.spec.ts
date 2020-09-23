import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {notificationUpdateResponse} from "@sentrei/functions/__dummy__/Notification";
import {
  userResponseApp,
  userResponseEmail,
} from "@sentrei/functions/__dummy__/User";
import Notification from "@sentrei/types/models/Notification";
import Space from "@sentrei/types/models/Space";

import notificationCountPlus from "../notificationCountPlus";

const testEnv = functions();
const db = admin.firestore();

beforeEach(() => {
  jest.clearAllMocks();
});

test("On create, return when app notifications are disabled", async done => {
  const snap = {
    data: (): Notification.Response => notificationUpdateResponse,
  };

  spyOn(db, "doc").and.returnValue({
    get: jest.fn().mockReturnValue({data: () => userResponseEmail}),
    update: jest.fn().mockReturnValue("updated"),
  });

  const context = {params: {userId: "userId"}};
  const wrapped = testEnv.wrap(notificationCountPlus);
  const req = await wrapped(snap, context);

  expect(req).toBe(false);
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc("").get).toHaveBeenCalledTimes(1);
  expect(db.doc("").update).not.toHaveBeenCalled();
  done();
});

test("On create, increment notificationCount", async done => {
  const snap = {
    data: (): Notification.Response => notificationUpdateResponse,
  };

  spyOn(db, "doc").and.returnValue({
    get: jest.fn().mockReturnValue({data: () => userResponseApp}),
    update: jest.fn().mockReturnValue("updated"),
  });

  const context = {params: {userId: "userId"}};
  const wrapped = testEnv.wrap(notificationCountPlus);
  const req = await wrapped(snap, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc("").get).toHaveBeenCalledTimes(1);
  expect(db.doc("").update).toHaveBeenCalledWith(<Space.AdminUpdate>{
    notificationCount: 1,
  });
  done();
});
