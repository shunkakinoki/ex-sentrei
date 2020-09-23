import {
  metadataCreate,
  metadataResponse,
  metadataUpdate,
} from "@sentrei/functions/__dummy__/Metadata";
import Space from "@sentrei/types/models/Space";

export const spaceBase = {
  description: "space",
  memberCount: 0,
  name: "space",
  namespaceId: "namespaceId",
  photo: null,
  photoHash: null,
  roomCount: 0,
  spaceId: "spaceId",
  stripeId: "",
};

export const spaceCreate: Space.Create = {
  ...spaceBase,
  ...metadataCreate,
  tier: "free",
};

export const spaceResponse: Space.Response = {
  ...spaceBase,
  ...metadataResponse,
  tier: "free",
};

export const spaceUpdate: Space.Update = {
  ...spaceBase,
  ...metadataUpdate,
};
