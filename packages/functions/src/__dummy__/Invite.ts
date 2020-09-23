import {
  profileResponse,
  profileGet,
} from "@sentrei/functions/__dummy__/Profile";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Invite from "@sentrei/types/models/Invite";

const baseInviteResponse = {
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  uid: "userId",
  roomId: null,
  spaceId: "spaceId",
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

export const emailInviteResponse: Invite.Response = {
  ...baseInviteResponse,
  ...profileResponse,
  method: "email",
};

export const linkInviteResponse: Invite.Response = {
  ...baseInviteResponse,
  ...profileResponse,
  method: "link",
};
