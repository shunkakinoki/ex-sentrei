import {
  profileResponse,
  profileGet,
} from "@sentrei/functions/__dummy__/Profile";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Participant from "@sentrei/types/models/Participant";

const baseUpdatedResponse = {
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

const baseParticipantResponse = {
  ...baseUpdatedResponse,
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  description: "",
  emoji: ":blush:",
  uid: "userId",
  participantSid: "participantSid",
  room: roomResponse,
  roomId: "roomId",
  spaceId: "spaceId",
};

// eslint-disable-next-line import/prefer-default-export
export const participantResponse: Participant.Response = {
  ...baseParticipantResponse,
  ...profileResponse,
};
