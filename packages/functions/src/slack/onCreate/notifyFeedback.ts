import * as functions from "firebase-functions";

import createMessageArgs from "@sentrei/functions/helpers/slack/createMessageArgs";
import WebClient from "@sentrei/functions/helpers/slack/WebClient";
import Feedback from "@sentrei/types/models/Feedback";

const config = functions.config().env;

const createSlackMessage = (data: Feedback.Response): string => {
  return `Emoji: ${data.emoji}\nDescription: ${data.description}`;
};

/**
 * Notify feedback to slack
 */
const notifyFeedback = functions.firestore
  .document("feedback/{feedbackId}")
  .onCreate(async (snap, context) => {
    const data = snap.data() as Feedback.Response;

    const message = createSlackMessage(data);
    const args = createMessageArgs(
      context,
      `feedback-${config.environment}-log`,
      message,
    );
    await WebClient.chat.postMessage(args);
  });

export default notifyFeedback;
