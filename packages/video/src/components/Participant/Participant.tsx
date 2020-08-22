import React from "react";

import {Participant as IParticipant} from "twilio-video";

import ParticipantInfo from "@sentrei/video/components/ParticipantInfo";
import ParticipantTracks from "@sentrei/video/components/ParticipantTracks";

interface ParticipantProps {
  participant: IParticipant;
  // eslint-disable-next-line react/require-default-props
  disableAudio?: boolean;
  // eslint-disable-next-line react/require-default-props
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
}: ParticipantProps): JSX.Element {
  return (
    <ParticipantInfo
      participant={participant}
      onClick={onClick}
      isSelected={isSelected}
    >
      <ParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
        enableScreenShare={enableScreenShare}
      />
    </ParticipantInfo>
  );
}
