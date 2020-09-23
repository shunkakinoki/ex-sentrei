import {
  profileResponse,
  profileGet,
} from "@sentrei/functions/__dummy__/Profile";
import {
  timestamp,
  timestampNow,
} from "@sentrei/functions/__mocks__/firebase-testing";
import Member from "@sentrei/types/models/Member";

const baseUpdatedResponse = {
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

const baseMemberResponse = {
  ...baseUpdatedResponse,
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  description: "",
  duration: 0,
  emoji: ":blush:",
  record: 0,
  score: 0,
  uid: "userId",
};

export const viewerMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "viewer",
  status: "offline",
};

export const moderatorMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "moderator",
  status: "offline",
};

export const adminMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "admin",
  status: "offline",
};

export const memberEmojiUpdate: Member.Update = {
  ...baseUpdatedResponse,
  emoji: "emoji",
  updatedAt: timestampNow,
};

export const memberDescriptionUpdate: Member.Update = {
  ...baseUpdatedResponse,
  description: "description",
  updatedAt: timestampNow,
};
