import Fab from "@material-ui/core/Fab";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import React, {useCallback, useRef} from "react";

import useLocalVideoToggle from "@sentrei/video/hooks/useLocalVideoToggle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  }),
);

export default function ToggleVideoButton(props: {
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}): JSX.Element {
  const classes = useStyles();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 200) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Tooltip
      title={isVideoEnabled ? "Mute Video" : "Unmute Video"}
      placement="top"
      PopperProps={{disablePortal: true}}
    >
      <Fab
        className={classes.fab}
        onClick={toggleVideo}
        // eslint-disable-next-line react/destructuring-assignment
        disabled={props.disabled}
      >
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Fab>
    </Tooltip>
  );
}
