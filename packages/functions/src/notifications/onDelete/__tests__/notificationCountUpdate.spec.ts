import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {notificationUpdateResponse} from "@sentrei/functions/__dummy__/Notification";
import {userResponseApp} from "@sentrei/functions/__dummy__/User";
import Notification from "@sentrei/types/models/Notification";
import Space from "@sentrei/types/models/Space";

import notificationCountMinus from "../notificationCountMinus";

const testEnv = functions();
const db = admin.firestore();

beforeEach(() => {
  jest.clearAllMocks();
});

test("On delete, decrement notificationCount", async done => {
  const snap = {
    data: (): Notification.Response => notificationUpdateResponse,
  };

  spyOn(db, "doc").and.returnValue({
    get: jest.fn().mockReturnValue({data: () => userResponseApp}),
    update: jest.fn().mockReturnValue("updated"),
  });

  const context = {params: {userId: "userId"}};
  const wrapped = testEnv.wrap(notificationCountMinus);
  const req = await wrapped(snap, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Space.AdminUpdate>{
    notificationCount: -1,
  });
  done();
});
