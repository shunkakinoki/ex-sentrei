import {useEffect, useRef} from "react";

// eslint-disable-next-line import/no-cycle
import useLocalVideoToggle from "@sentrei/video/hooks/useLocalVideoToggle";
// eslint-disable-next-line import/no-cycle
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import {isMobile} from "@sentrei/video/utils";

/*
  This component adds a visibilitychange handler to the document when
  the user is using a mobile device. When the handler detects that
  the browser has been backgrounded, it unpublishes the users local
  video track. The browser cannot send video to the room when it has
  been backgrounded, so unpublishing the track stops video capture
  on the device, and triggers a UI update for all other participants
  to show that this user's video track has been turned off.
*/

export default function AttachVisibilityHandler(): null {
  const {room} = useVideoContext();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const shouldRepublishVideoOnForeground = useRef(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isMobile) {
      const handleVisibilityChange = (): void => {
        // We don't need to unpublish the local video track if it has already been unpublished
        if (document.visibilityState === "hidden" && isVideoEnabled) {
          shouldRepublishVideoOnForeground.current = true;
          toggleVideoEnabled();

          // Don't publish the local video track if it wasn't published before the app was backgrounded
        } else if (shouldRepublishVideoOnForeground.current) {
          shouldRepublishVideoOnForeground.current = false;
          toggleVideoEnabled();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return (): void => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }
  }, [isVideoEnabled, room, toggleVideoEnabled]);

  return null;
}
