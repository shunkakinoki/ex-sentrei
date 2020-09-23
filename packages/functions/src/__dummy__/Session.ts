import {
  profileResponse,
  profileGet,
} from "@sentrei/functions/__dummy__/Profile";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Session from "@sentrei/types/models/Session";

const baseSessionResponse = {
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  uid: "userId",
  room: roomResponse,
  roomId: "roomId",
  roomSid: "roomSid",
  spaceId: "spaceId",
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

export const memberSessionResponse: Session.Response = {
  ...baseSessionResponse,
  ...profileResponse,
  duration: 3,
  model: "member",
  status: "connected",
  type: "focus",
};

export const roomSessionResponse: Session.Response = {
  ...baseSessionResponse,
  ...profileResponse,
  duration: 3,
  model: "room",
  status: "connected",
  type: "focus",
};
