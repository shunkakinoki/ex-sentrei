import {useCallback, useState} from "react";
import {LocalVideoTrack} from "twilio-video";

// eslint-disable-next-line import/no-cycle
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function useLocalVideoToggle(): readonly [true, () => void] {
  const {
    room: {localParticipant},
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
    onError,
  } = useVideoContext();
  const videoTrack = localTracks.find(track =>
    track.name.includes("camera"),
  ) as LocalVideoTrack;
  const [isPublishing, setIspublishing] = useState(false);

  const toggleVideoEnabled = useCallback(() => {
    if (!isPublishing) {
      if (videoTrack) {
        const localTrackPublication = localParticipant?.unpublishTrack(
          videoTrack,
        );
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant?.emit("trackUnpublished", localTrackPublication);
        removeLocalVideoTrack();
      } else {
        setIspublishing(true);
        getLocalVideoTrack()
          .then((track: LocalVideoTrack) =>
            localParticipant?.publishTrack(track, {
              priority: "low",
            }),
          )
          .catch(onError)
          .finally(() => setIspublishing(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    videoTrack,
    localParticipant,
    getLocalVideoTrack,
    isPublishing,
    onError,
    removeLocalVideoTrack,
  ]);

  return [!!videoTrack, toggleVideoEnabled] as const;
}
