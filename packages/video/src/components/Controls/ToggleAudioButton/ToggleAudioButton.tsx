import Fab from "@material-ui/core/Fab";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import React from "react";

import useLocalAudioToggle from "@sentrei/video/hooks/useLocalAudioToggle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  }),
);

export default function ToggleAudioButton(props: {
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}): JSX.Element {
  const classes = useStyles();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

  return (
    <Tooltip
      title={isAudioEnabled ? "Mute Audio" : "Unmute Audio"}
      placement="top"
      PopperProps={{disablePortal: true}}
    >
      <Fab
        className={classes.fab}
        onClick={toggleAudioEnabled}
        // eslint-disable-next-line react/destructuring-assignment
        disabled={props.disabled}
        data-cy-audio-toggle
      >
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Fab>
    </Tooltip>
  );
}
