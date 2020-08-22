import {useEffect, useState} from "react";
import {RemoteParticipant} from "twilio-video";

import useDominantSpeaker from "@sentrei/video/hooks/useDominantSpeaker";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function useParticipants(): RemoteParticipant[] {
  const {room} = useVideoContext();
  const dominantSpeaker = useDominantSpeaker();
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  );

  // When the dominant speaker changes, they are moved to the front of the participants array.
  // This means that the most recent dominant speakers will always be near the top of the
  // ParticipantStrip component.
  useEffect(() => {
    if (dominantSpeaker) {
      setParticipants(prevParticipants => [
        dominantSpeaker,
        ...prevParticipants.filter(
          participant => participant !== dominantSpeaker,
        ),
      ]);
    }
  }, [dominantSpeaker]);

  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant): void =>
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    const participantDisconnected = (participant: RemoteParticipant): void =>
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant),
      );
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    return (): void => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  return participants;
}
