import {useState, useEffect} from "react";
import {
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from "twilio-video";

type TrackType =
  | LocalAudioTrack
  | LocalVideoTrack
  | RemoteAudioTrack
  | RemoteVideoTrack
  | undefined;

export default function useIsTrackEnabled(track: TrackType): boolean {
  const [isEnabled, setIsEnabled] = useState(track ? track.isEnabled : false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setIsEnabled(track ? track.isEnabled : false);

    if (track) {
      const setEnabled = (): void => setIsEnabled(true);
      const setDisabled = (): void => setIsEnabled(false);
      track.on("enabled", setEnabled);
      track.on("disabled", setDisabled);
      return (): void => {
        track.off("enabled", setEnabled);
        track.off("disabled", setDisabled);
      };
    }
  }, [track]);

  return isEnabled;
}
