import {useEffect} from "react";
import {Room} from "twilio-video";

import {Callback} from "@sentrei/video/types";

export default function useHandleTrackPublicationFailed(
  room: Room,
  onError: Callback,
): void {
  const {localParticipant} = room;
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (localParticipant) {
      localParticipant.on("trackPublicationFailed", onError);
      return (): void => {
        localParticipant.off("trackPublicationFailed", onError);
      };
    }
  }, [localParticipant, onError]);
}
