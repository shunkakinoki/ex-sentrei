import {useEffect, useState} from "react";
import {Participant} from "twilio-video";

export default function useParticipantIsReconnecting(
  participant: Participant,
): boolean {
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnecting = (): void => setIsReconnecting(true);
    const handleReconnected = (): void => setIsReconnecting(false);

    participant.on("reconnecting", handleReconnecting);
    participant.on("reconnected", handleReconnected);
    return (): void => {
      participant.off("reconnecting", handleReconnecting);
      participant.off("reconnected", handleReconnected);
    };
  }, [participant]);

  return isReconnecting;
}
