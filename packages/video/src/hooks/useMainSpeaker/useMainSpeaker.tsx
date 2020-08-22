import {Participant} from "twilio-video";

import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useDominantSpeaker from "@sentrei/video/hooks/useDominantSpeaker";
import useParticipants from "@sentrei/video/hooks/useParticipants";
import useScreenShareParticipant from "@sentrei/video/hooks/useScreenShareParticipant";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function useMainSpeaker(): Participant {
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const dominantSpeaker = useDominantSpeaker();
  const participants = useParticipants();
  const {
    room: {localParticipant},
  } = useVideoContext();

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return (
    selectedParticipant ||
    screenShareParticipant ||
    dominantSpeaker ||
    participants[0] ||
    localParticipant
  );
}
