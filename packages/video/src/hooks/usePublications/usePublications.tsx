import {useEffect, useState} from "react";
import {
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
} from "twilio-video";

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export default function usePublications(
  participant: Participant,
): TrackPublication[] {
  const [publications, setPublications] = useState<TrackPublication[]>([]);

  useEffect(() => {
    // Reset the publications when the 'participant' variable changes.
    setPublications(
      Array.from(participant.tracks.values()) as TrackPublication[],
    );

    const publicationAdded = (publication: TrackPublication): void =>
      setPublications(prevPublications => [...prevPublications, publication]);
    const publicationRemoved = (publication: TrackPublication): void =>
      setPublications(prevPublications =>
        prevPublications.filter(p => p !== publication),
      );

    participant.on("trackPublished", publicationAdded);
    participant.on("trackUnpublished", publicationRemoved);
    return (): void => {
      participant.off("trackPublished", publicationAdded);
      participant.off("trackUnpublished", publicationRemoved);
    };
  }, [participant]);

  return publications;
}
