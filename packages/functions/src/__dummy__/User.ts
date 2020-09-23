import User from "@sentrei/types/models/User";

export const userResponse: User.Response = {
  duration: 0,
  email: "user@sentrei.com",
  notificationCount: 0,
  notificationSettings: {chat: [], general: [], update: []},
  name: "user",
  namespaceId: "userId",
  record: 0,
  role: "viewer",
  photo: null,
  photoHash: null,
  score: 0,
};

export const userResponseApp: User.Response = {
  ...userResponse,
  notificationSettings: {chat: ["app"], general: ["app"], update: ["app"]},
};

export const userResponseEmail: User.Response = {
  ...userResponse,
  notificationSettings: {
    chat: ["email"],
    general: ["email"],
    update: ["email"],
  },
};

export const userResponseInitial: User.Response = {
  ...userResponse,
  notificationSettings: {
    chat: [],
    general: [],
    update: [],
  },
};

export const userResponseAll: User.Response = {
  ...userResponse,
  notificationSettings: {
    chat: ["app", "email"],
    general: ["app", "email"],
    update: ["app", "email"],
  },
};
