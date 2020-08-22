import Room from "@sentrei/types/models/Room";

type RoomCreateForm = {
  name: string;
  type: Room.Types;
};

export default RoomCreateForm;
