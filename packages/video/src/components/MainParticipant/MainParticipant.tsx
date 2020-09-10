import MainParticipantInfo from "@sentrei/video/components/MainParticipantInfo";
import ParticipantTracks from "@sentrei/video/components/ParticipantTracks";
import React from "react";
import useMainSpeaker from "@sentrei/video/hooks/useMainSpeaker";
import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useScreenShareParticipant from "@sentrei/video/hooks/useScreenShareParticipant";

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker();
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  const videoPriority =
    mainParticipant === selectedParticipant ||
    mainParticipant === screenShareParticipant
      ? "high"
      : null;

  return (
    /* audio is disabled for this participant component because this participant's audio
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        enableScreenShare
        videoPriority={videoPriority}
      />
    </MainParticipantInfo>
  );
}
