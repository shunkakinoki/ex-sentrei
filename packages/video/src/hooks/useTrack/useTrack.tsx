import {useEffect, useState} from "react";
import {LocalTrackPublication, RemoteTrackPublication} from "twilio-video";

export default function useTrack(
  publication: LocalTrackPublication | RemoteTrackPublication | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const [track, setTrack] = useState(publication && publication.track);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track);

    if (publication) {
      const removeTrack = (): void => setTrack(null);

      publication.on("subscribed", setTrack);
      publication.on("unsubscribed", removeTrack);
      return (): void => {
        publication.off("subscribed", setTrack);
        publication.off("unsubscribed", removeTrack);
      };
    }
  }, [publication]);

  return track;
}
