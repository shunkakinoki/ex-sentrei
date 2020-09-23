import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import createMessageArgs from "@sentrei/functions/helpers/slack/createMessageArgs";
import WebClient from "@sentrei/functions/helpers/slack/WebClient";

const config = functions.config().env;

const createSlackMessage = (event: admin.auth.UserRecord): string => {
  // eslint-disable-next-line prettier/prettier
  return `Email: ${event.email}\nName: ${event.displayName}\nProvider: ${
    event.providerData[event.providerData.length - 2]
  }`;
};

/**
 * Notify signup to slack
 */
const notifySignup = functions.auth.user().onCreate(async (event, context) => {
  const message = createSlackMessage(event);
  const args = createMessageArgs(
    context,
    `signup-${config.environment}-log`,
    message,
  );
  await WebClient.chat.postMessage(args);
});

export default notifySignup;
