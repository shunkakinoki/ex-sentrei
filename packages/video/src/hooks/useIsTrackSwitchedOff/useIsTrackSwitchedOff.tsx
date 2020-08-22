import {useState, useEffect} from "react";
import {LocalVideoTrack, RemoteVideoTrack} from "twilio-video";

type TrackType = RemoteVideoTrack | LocalVideoTrack | undefined | null;

// The 'switchedOff' event is emitted when there is not enough bandwidth to support
// a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs

export default function useIsTrackSwitchedOff(track: TrackType): boolean {
  const [isSwitchedOff, setIsSwitchedOff] = useState(
    track && track.isSwitchedOff,
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Reset the value if the 'track' variable changes
    setIsSwitchedOff(track && track.isSwitchedOff);

    if (track) {
      const handleSwitchedOff = (): void => setIsSwitchedOff(true);
      const handleSwitchedOn = (): void => setIsSwitchedOff(false);
      track.on("switchedOff", handleSwitchedOff);
      track.on("switchedOn", handleSwitchedOn);
      return (): void => {
        track.off("switchedOff", handleSwitchedOff);
        track.off("switchedOn", handleSwitchedOn);
      };
    }
  }, [track]);

  return !!isSwitchedOff;
}
