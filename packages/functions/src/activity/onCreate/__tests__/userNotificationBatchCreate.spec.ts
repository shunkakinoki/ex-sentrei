/* eslint-disable @typescript-eslint/no-explicit-any */

import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {activitySpaceResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import {notificationUpdateResponse} from "@sentrei/functions/__dummy__/Notification";
import {adminTimestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Activity from "@sentrei/types/models/Activity";
import Notification from "@sentrei/types/models/Notification";

import userNotificationBatchCreate from "../userNotificationBatchCreate";

const testEnv = functions();
const db = admin.firestore();

test("Return when an activity should not notify any users", async done => {
  const snap = {
    data: (): Activity.UpdateSpace => ({
      ...activitySpaceResponseUpdated,
      userNotification: [],
    }),
  };

  const context = {params: {activityId: "notificationId"}};
  const wrapped = testEnv.wrap(userNotificationBatchCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(false);
  expect(db.batch().create).not.toHaveBeenCalled();
  expect(db.batch().commit).not.toHaveBeenCalled();
  done();
});

test("Send a notification to all required users", async done => {
  spyOn(db.batch(), "commit").and.returnValue("sent");

  when(db.collection as any)
    .calledWith("users/user1/notifications")
    .mockReturnValue({
      doc: jest.fn().mockReturnValue("user1Ref"),
    });

  when(db.collection as any)
    .calledWith("users/user2/notifications")
    .mockReturnValue({
      doc: jest.fn().mockReturnValue("user2Ref"),
    });

  const snapData: Activity.UpdateSpace = {
    ...activitySpaceResponseUpdated,
    userNotification: ["user1", "user2"],
  };
  const expected: Notification.Create = {
    ...notificationUpdateResponse,
    updatedAt: adminTimestamp,
  };
  const snap = {
    data: (): Activity.UpdateSpace => snapData,
  };

  const context = {params: {activityId: "notificationId"}};
  const wrapped = testEnv.wrap(userNotificationBatchCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe("sent");
  expect(db.batch().create).toHaveBeenCalledWith("user1Ref", expected);
  expect(db.batch().create).toHaveBeenCalledWith("user2Ref", expected);
  done();
});
