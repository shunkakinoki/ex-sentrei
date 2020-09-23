import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityFeedbackResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {feedbackResponse} from "@sentrei/functions/__dummy__/Feedback";
import Feedback from "@sentrei/types/models/Feedback";

import activityFeedbackCreate from "../activityFeedbackCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new feedback to activities", async done => {
  const snap = {
    data: (): Feedback.Response => feedbackResponse,
  };
  const context = {
    params: {feedbackId: "feedbackId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityFeedbackCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityFeedbackResponseCreated,
  );
  done();
});
