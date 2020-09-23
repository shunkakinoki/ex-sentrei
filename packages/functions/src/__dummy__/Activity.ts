import {feedbackResponse} from "@sentrei/functions/__dummy__/Feedback";
import {emailInviteResponse} from "@sentrei/functions/__dummy__/Invite";
import {viewerMemberResponse} from "@sentrei/functions/__dummy__/Member";
import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {memberSessionResponse} from "@sentrei/functions/__dummy__/Session";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import {
  adminTimestamp,
  timestamp,
} from "@sentrei/functions/__mocks__/firebase-testing";
import Activity from "@sentrei/types/models/Activity";

export const activityResponseBase = {
  categoryId: "categoryId",
  createdByUid: "userId",
  spaceId: "spaceId",
  updatedAt: timestamp,
  user: profileGet,
  userNotification: [],
};

export const activitySpaceResponseCreated: Activity.CreateSpace = {
  ...activityResponseBase,
  before: null,
  after: spaceResponse,
  action: "created",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
};

export const activitySpaceResponseUpdated: Activity.UpdateSpace = {
  ...activityResponseBase,
  before: spaceResponse,
  after: spaceResponse,
  action: "updated",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
};

export const activitySpaceResponseDeleted: Activity.DeleteSpace = {
  ...activityResponseBase,
  before: spaceResponse,
  after: null,
  action: "deleted",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
  updatedAt: adminTimestamp,
};

export const activityRoomResponseCreated: Activity.CreateRoom = {
  ...activityResponseBase,
  before: null,
  after: roomResponse,
  action: "created",
  category: "rooms",
  categoryId: "roomId",
  roomId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
};

export const activityRoomResponseUpdated: Activity.UpdateRoom = {
  ...activityResponseBase,
  before: roomResponse,
  after: roomResponse,
  action: "updated",
  category: "rooms",
  categoryId: "roomId",
  roomId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
};

export const activityRoomResponseDeleted: Activity.DeleteRoom = {
  ...activityResponseBase,
  before: roomResponse,
  after: null,
  action: "deleted",
  category: "rooms",
  categoryId: "roomId",
  roomId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
  updatedAt: adminTimestamp,
};

export const activityMemberResponseCreated: Activity.CreateMember = {
  ...activityResponseBase,
  before: null,
  after: viewerMemberResponse,
  action: "created",
  category: "members",
  categoryId: "userId",
  fullItemPath: "spaces/spaceId/members/userId",
  itemPath: "members/userId",
  spaceId: "spaceId",
};

export const activityMemberResponseUpdated: Activity.UpdateMember = {
  ...activityResponseBase,
  before: null,
  after: viewerMemberResponse,
  action: "updated",
  category: "members",
  categoryId: "userId",
  fullItemPath: "spaces/spaceId/members/userId",
  itemPath: "members/userId",
  spaceId: "spaceId",
};

export const activityMemberResponseDeleted: Activity.DeleteMember = {
  ...activityResponseBase,
  before: viewerMemberResponse,
  after: null,
  action: "deleted",
  category: "members",
  categoryId: "userId",
  fullItemPath: "spaces/spaceId/members/userId",
  itemPath: "members/userId",
  updatedAt: adminTimestamp,
};

export const activityParticipantResponseCreated: Activity.CreateParticipant = {
  ...activityResponseBase,
  before: null,
  after: participantResponse,
  action: "created",
  category: "participants",
  categoryId: "userId",
  fullItemPath: "rooms/roomId/participants/userId",
  itemPath: "participants/userId",
  spaceId: "spaceId",
};

export const activityParticipantResponseDeleted: Activity.DeleteParticipant = {
  ...activityResponseBase,
  before: participantResponse,
  after: null,
  action: "deleted",
  category: "participants",
  categoryId: "userId",
  fullItemPath: "rooms/roomId/participants/userId",
  itemPath: "participants/userId",
  updatedAt: adminTimestamp,
};

export const activityInviteResponseCreated: Activity.CreateInvite = {
  ...activityResponseBase,
  before: null,
  after: emailInviteResponse,
  action: "created",
  category: "invites",
  categoryId: "inviteId",
  fullItemPath: "spaces/spaceId/invites/inviteId",
  itemPath: "invites/inviteId",
  spaceId: "spaceId",
};

export const activityInviteResponseDeleted: Activity.DeleteInvite = {
  ...activityResponseBase,
  before: emailInviteResponse,
  after: null,
  action: "deleted",
  category: "invites",
  categoryId: "inviteId",
  fullItemPath: "spaces/spaceId/invites/inviteId",
  itemPath: "invites/inviteId",
  updatedAt: adminTimestamp,
};

export const activitySessionResponseCreated: Activity.CreateSession = {
  ...activityResponseBase,
  before: null,
  after: memberSessionResponse,
  action: "created",
  category: "sessions",
  categoryId: "sessionId",
  fullItemPath: "sessions/sessionId",
  itemPath: "sessions/sessionId",
  roomId: "roomId",
  spaceId: "spaceId",
  type: "focus",
};

export const activitySessionResponseUpdated: Activity.UpdateSession = {
  ...activityResponseBase,
  before: memberSessionResponse,
  after: memberSessionResponse,
  action: "updated",
  category: "sessions",
  categoryId: "sessionId",
  fullItemPath: "sessions/sessionId",
  itemPath: "sessions/sessionId",
  roomId: "roomId",
  spaceId: "spaceId",
  type: "focus",
  value: 3,
};

export const activityFeedbackResponseCreated: Activity.CreateFeedback = {
  before: null,
  after: feedbackResponse,
  action: "created",
  category: "feedback",
  categoryId: "feedbackId",
  createdByUid: "userId",
  fullItemPath: "feedback/feedbackId",
  itemPath: "feedback/feedbackId",
  updatedAt: timestamp,
  user: profileGet,
  userNotification: [],
};
