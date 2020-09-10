import useVideoContext from "@sentrei/video/hooks/useVideoContext/useVideoContext";
import useDominantSpeaker from "@sentrei/video/hooks/useDominantSpeaker/useDominantSpeaker";
import useParticipants from "@sentrei/video/hooks/useParticipants/useParticipants";
import useScreenShareParticipant from "@sentrei/video/hooks/useScreenShareParticipant/useScreenShareParticipant";
import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant/useSelectedParticipant";

export default function useMainSpeaker() {
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
