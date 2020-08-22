import {styled} from "@material-ui/core/styles";
import React from "react";

import Participant from "@sentrei/video/components/Participant";
import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useParticipants from "@sentrei/video/hooks/useParticipants";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

const Container = styled("aside")(({theme}) => ({
  padding: "0.5em",
  overflowY: "auto",
  [theme.breakpoints.down("xs")]: {
    overflowY: "initial",
    overflowX: "auto",
    padding: 0,
    display: "flex",
  },
}));

const ScrollContainer = styled("div")(({theme}) => ({
  [theme.breakpoints.down("xs")]: {
    display: "flex",
  },
}));

export default function ParticipantStrip(): JSX.Element {
  const {
    room: {localParticipant},
  } = useVideoContext();
  const participants = useParticipants();
  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useSelectedParticipant();

  return (
    <Container>
      <ScrollContainer>
        <Participant
          participant={localParticipant}
          isSelected={selectedParticipant === localParticipant}
          onClick={(): void => setSelectedParticipant(localParticipant)}
        />
        {participants.map(participant => (
          <Participant
            key={participant.sid}
            participant={participant}
            isSelected={selectedParticipant === participant}
            onClick={(): void => setSelectedParticipant(participant)}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
}
