import {InitialRoomColor} from "@sentrei/common/const/color";
import {
  metadataCreate,
  metadataResponse,
  metadataUpdate,
} from "@sentrei/functions/__dummy__/Metadata";
import Room from "@sentrei/types/models/Room";

export const roomBase = {
  description: "",
  emoji: ":sushi:",
  name: "room",
  nameroomId: "nameroomId",
  participantCount: 0,
  color: InitialRoomColor,
  spaceId: "spaceId",
};

export const roomCreate: Room.Create = {
  ...roomBase,
  ...metadataCreate,
  type: "focus",
};

export const roomResponse: Room.Response = {
  ...roomBase,
  ...metadataResponse,
  type: "focus",
};

export const roomUpdate: Room.Update = {
  ...roomBase,
  ...metadataUpdate,
};
