import {useEffect} from "react";
import {Room} from "twilio-video";

import {Callback} from "@sentrei/video/types";

export default function useHandleOnDisconnect(
  room: Room,
  onDisconnect: Callback,
): void {
  useEffect(() => {
    room.on("disconnected", onDisconnect);
    return (): void => {
      room.off("disconnected", onDisconnect);
    };
  }, [room, onDisconnect]);
}
