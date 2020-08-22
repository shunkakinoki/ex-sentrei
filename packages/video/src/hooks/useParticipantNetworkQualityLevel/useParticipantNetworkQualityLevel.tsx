import {useEffect, useState} from "react";
import {Participant} from "twilio-video";

export default function useParticipantNetworkQualityLevel(
  participant: Participant,
): number | null {
  const [networkQualityLevel, setNetworkQualityLevel] = useState(
    participant.networkQualityLevel,
  );

  useEffect(() => {
    const handleNewtorkQualityLevelChange = (
      newNetworkQualityLevel: number,
    ): void => setNetworkQualityLevel(newNetworkQualityLevel);

    setNetworkQualityLevel(participant.networkQualityLevel);
    participant.on(
      "networkQualityLevelChanged",
      handleNewtorkQualityLevelChange,
    );
    return (): void => {
      participant.off(
        "networkQualityLevelChanged",
        handleNewtorkQualityLevelChange,
      );
    };
  }, [participant]);

  return networkQualityLevel;
}
