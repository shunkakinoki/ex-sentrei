import Room from "@sentrei/types/models/Room";

type RoomCreateForm = {
  id: string;
  name: string;
  type: Room.Types;
};

export default RoomCreateForm;
