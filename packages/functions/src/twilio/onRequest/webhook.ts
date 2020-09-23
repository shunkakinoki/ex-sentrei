/* eslint-disable no-console */

/* Inspired by: https://qiita.com/mobilebiz/items/b300861475409fee8199 */
/* https://qiita.com/mobilebiz/items/8666058c3df1d0515fae */

import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import SentryClient from "@sentrei/functions/helpers/sentry/SentryClient";
import connectMemberSession from "@sentrei/functions/helpers/twilio/connectMemberSession";
import connectRoomSession from "@sentrei/functions/helpers/twilio/connectRoomSession";
import createParticpant from "@sentrei/functions/helpers/twilio/createParticipant";
import deleteParticipant from "@sentrei/functions/helpers/twilio/deleteParticipant";
import disconnectMemberSession from "@sentrei/functions/helpers/twilio/disconnectMemberSession";
import disconnectRoomSession from "@sentrei/functions/helpers/twilio/disconnectRoomSession";
import TwilioClient from "@sentrei/functions/helpers/twilio/TwilioClient";

/**
 * Invoke twilio webhook on call
 */
const webhook = functions.https.onRequest(
  async (request, response): Promise<void> => {
    const event = request.body;
    const statusCallbackEvent = event.StatusCallbackEvent;

    console.log(`StatusCallbackEvent: ${statusCallbackEvent}`);
    console.log(`Event: ${JSON.stringify(event)}`);

    switch (statusCallbackEvent) {
      case "room-created": {
        return response.status(200).end();
      }
      case "room-ended": {
        return response.status(200).end();
      }
      case "participant-connected": {
        const roomSid = event.RoomSid;
        const roomId = event.RoomName;
        const userId = event.ParticipantIdentity;
        const participantSid = event.ParticipantSid;

        trackEvent(userId, "Connect Room Participant", {
          roomId,
          roomSid,
          participantSid,
        });

        await Promise.all([
          createParticpant(userId, roomId, participantSid),
          connectMemberSession(userId, roomId, participantSid, roomSid),
          connectRoomSession(userId, roomId, roomSid),
        ]);

        return response.status(200).end();
      }
      case "participant-disconnected": {
        const roomSid = event.RoomSid;
        const roomId = event.RoomName;
        const memberDuration = Number(event.ParticipantDuration);
        const userId = event.ParticipantIdentity;
        const participantSid = event.ParticipantSid;

        trackEvent(userId, "Disconnect Room Participant", {
          roomId,
          roomSid,
          participantSid,
          memberDuration,
        });

        await Promise.all([
          deleteParticipant(roomId, participantSid),
          disconnectMemberSession(
            userId,
            participantSid,
            roomSid,
            memberDuration,
          ),
        ]);

        let fAlive = false;
        TwilioClient.video.rooms(roomSid).participants.each(
          {
            status: "connected",
            done: err => {
              if (err) {
                console.error(`Room closing error: ${err}`);
                SentryClient.captureException(err);
                SentryClient.flush(3000);
                return response.status(400).end();
              }
              if (!fAlive) {
                TwilioClient.video
                  .rooms(roomSid)
                  .update({
                    status: "completed",
                  })
                  .then(async videoRoom => {
                    console.log(`Room closed. ${JSON.stringify(videoRoom)}`);

                    const roomDuration = Number(videoRoom.duration);

                    trackEvent(userId, "Close Room", {
                      roomId,
                      roomSid,
                      roomDuration,
                    });

                    await disconnectRoomSession(userId, roomSid, roomDuration);
                  })
                  .catch(err => {
                    console.error(`Room closing error: ${err}`);
                    SentryClient.captureException(err);
                    SentryClient.flush(3000);
                    return response.status(400).end();
                  });
              } else {
                return response.json({
                  received: true,
                });
              }
              return true;
            },
          },
          participant => {
            console.log(`Participant: ${participant.identity} is alive.`);
            fAlive = true;
          },
        );
        return response.status(200).end();
      }
      case "track-added": {
        return response.status(200).end();
      }
      case "track-removed": {
        return response.status(200).end();
      }
      case "track-enabled": {
        return response.status(200).end();
      }
      case "track-disabled": {
        return response.status(200).end();
      }
      default: {
        response.status(400).end();
        return response.status(200).end();
      }
    }
  },
);

export default webhook;
