import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Feedback from "@sentrei/types/models/Feedback";

export const feedbackResponse: Feedback.Response = {
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  description: "description",
  emoji: null,
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};
