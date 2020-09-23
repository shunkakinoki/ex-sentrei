import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {
  timestamp,
  timestampNow,
} from "@sentrei/functions/__mocks__/firebase-testing";
import Metadata from "@sentrei/types/models/Metadata";

export const metadataUpdate: Metadata.Update = {
  updatedAt: timestampNow,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

export const metadataCreate: Metadata.Create = {
  ...metadataUpdate,
  createdAt: timestampNow,
  createdBy: profileGet,
  createdByUid: "userId",
};

export const metadataResponse: Metadata.Response = {
  ...metadataCreate,
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  updatedAt: timestamp,
};
