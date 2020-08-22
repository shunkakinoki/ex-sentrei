import React, {createContext, useContext, useState, useEffect} from "react";
import {Participant, Room} from "twilio-video";

type selectedParticipantContextType = [
  Participant | null,
  (participant: Participant) => void,
];

export const selectedParticipantContext = createContext<
  selectedParticipantContextType
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
>(null!);

export default function useSelectedParticipant(): readonly [
  Participant | null,
  (participant: Participant) => void,
] {
  const [selectedParticipant, setSelectedParticipant] = useContext(
    selectedParticipantContext,
  );
  return [selectedParticipant, setSelectedParticipant] as const;
}

type SelectedParticipantProviderProps = {
  room: Room;
  children: React.ReactNode;
};

export function SelectedParticipantProvider({
  room,
  children,
}: SelectedParticipantProviderProps): JSX.Element {
  const [
    selectedParticipant,
    _setSelectedParticipant,
  ] = useState<Participant | null>(null);
  const setSelectedParticipant = (participant: Participant): void =>
    _setSelectedParticipant(prevParticipant =>
      prevParticipant === participant ? null : participant,
    );

  useEffect(() => {
    const onDisconnect = (): void => _setSelectedParticipant(null);
    room.on("disconnected", onDisconnect);
    return (): void => {
      room.off("disconnected", onDisconnect);
    };
  }, [room]);

  return (
    <selectedParticipantContext.Provider
      value={[selectedParticipant, setSelectedParticipant]}
    >
      {children}
    </selectedParticipantContext.Provider>
  );
}
