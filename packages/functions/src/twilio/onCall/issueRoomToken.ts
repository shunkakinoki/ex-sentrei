/* eslint-disable no-console */
/* Inspired by: https://qiita.com/mobilebiz/items/b300861475409fee8199 */

import * as functions from "firebase-functions";
import * as twilio from "twilio";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import SentryClient from "@sentrei/functions/helpers/sentry/SentryClient";
import TwilioClient from "@sentrei/functions/helpers/twilio/TwilioClient";

const config = functions.config().env;

const MAX_ALLOWED_SESSION_DURATION = 14400;

/**
 * Issue Twilio Video Room Token
 */
export const issueRoomToken = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
    );
  }

  const {roomId} = data;
  if (!roomId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "roomId is required!",
    );
  }

  trackEvent(uid, "Create Room Token", {roomId});

  await TwilioClient.video.rooms
    .list({
      uniqueName: roomId,
    })
    .then(rooms => {
      console.log("rooms.length: ", rooms.length);
      if (rooms.length === 0) {
        trackEvent(uid, "Create Room", {roomId});

        return TwilioClient.video.rooms.create({
          maxParticipants: 3,
          recordParticipantsOnConnect: false,
          type: "peer-to-peer",
          uniqueName: roomId,
          statusCallback: `https://us-central1-sentrei-${config.environment}.cloudfunctions.net/v1-twilio-webhook`,
        });
      }
      return null;
    })
    .then(room => {
      if (room.sid) {
        console.log(`Room created: ${JSON.stringify(room)}`);
      } else {
        console.log(`Room existed: ${JSON.stringify(room)}.`);
      }
    })
    .catch(err => {
      console.error(`Room create error: ${err}`);
      trackEvent(uid, "Exception", {roomId});
      SentryClient.captureException(err);
      SentryClient.flush(3000);
    });

  const {AccessToken} = twilio.jwt;

  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKeySid,
    config.twilio.apiKeySecret,
    {
      identity: uid,
      ttl: MAX_ALLOWED_SESSION_DURATION,
    },
  );

  token.addGrant(
    new AccessToken.VideoGrant({
      room: roomId,
    }),
  );
  return token.toJwt();
});

export default issueRoomToken;
