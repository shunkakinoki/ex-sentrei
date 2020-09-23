import Profile from "@sentrei/types/models/Profile";

export const profileGet: Profile.Get = {
  uid: "userId",
  name: "profileUser",
  namespaceId: "userId",
  photo: null,
  photoHash: null,
};

export const profileResponse: Profile.Response = {
  name: "profileUser",
  namespaceId: "userId",
  photo: null,
  photoHash: null,
};
