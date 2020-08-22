import {useEffect} from "react";
import {Room, TwilioError} from "twilio-video";

import {Callback} from "@sentrei/video/types";

export default function useHandleRoomDisconnectionErrors(
  room: Room,
  onError: Callback,
): void {
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const onDisconnected = (room: Room, error: TwilioError): void => {
      if (error) {
        onError(error);
      }
    };

    room.on("disconnected", onDisconnected);
    return (): void => {
      room.off("disconnected", onDisconnected);
    };
  }, [room, onError]);
}
