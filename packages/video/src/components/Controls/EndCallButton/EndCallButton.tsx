import Fab from "@material-ui/core/Fab";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import CallEnd from "@material-ui/icons/CallEnd";
import React from "react";
import Room from "twilio-video";

import useVideoContext from "@sentrei/video/hooks/useVideoContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  }),
);

export default function EndCallButton(): JSX.Element {
  const classes = useStyles();
  const {room} = useVideoContext();

  return (
    <Tooltip
      title="End Call"
      onClick={(): Room.Room => room.disconnect()}
      placement="top"
      PopperProps={{disablePortal: true}}
    >
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
