import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityParticipantResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";

import activityParticipantCreate from "../activityParticipantCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new participant to activities", async done => {
  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const context = {
    params: {roomId: "roomId", participantId: "userId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityParticipantCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityParticipantResponseCreated,
  );
  done();
});
