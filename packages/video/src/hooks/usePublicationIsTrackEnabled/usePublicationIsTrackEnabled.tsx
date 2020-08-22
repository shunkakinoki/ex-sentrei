import {useState, useEffect} from "react";
import {LocalTrackPublication, RemoteTrackPublication} from "twilio-video";

type PublicationType = LocalTrackPublication | RemoteTrackPublication;

export default function usePublicationIsTrackEnabled(
  publication?: PublicationType,
): boolean {
  const [isEnabled, setIsEnabled] = useState(
    publication ? publication.isTrackEnabled : false,
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setIsEnabled(publication ? publication.isTrackEnabled : false);

    if (publication) {
      const setEnabled = (): void => setIsEnabled(true);
      const setDisabled = (): void => setIsEnabled(false);
      publication.on("trackEnabled", setEnabled);
      publication.on("trackDisabled", setDisabled);
      return (): void => {
        publication.off("trackEnabled", setEnabled);
        publication.off("trackDisabled", setDisabled);
      };
    }
  }, [publication]);

  return isEnabled;
}
