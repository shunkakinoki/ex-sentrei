import {useCallback} from "react";
import {LocalAudioTrack} from "twilio-video";

import useIsTrackEnabled from "@sentrei/video/hooks/useIsTrackEnabled";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function useLocalAudioToggle(): readonly [boolean, () => void] {
  const {localTracks} = useVideoContext();
  const audioTrack = localTracks.find(
    track => track.kind === "audio",
  ) as LocalAudioTrack;
  const isEnabled = useIsTrackEnabled(audioTrack);

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
    }
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled] as const;
}
