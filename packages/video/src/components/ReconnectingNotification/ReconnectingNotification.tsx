import {SnackbarContent} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";

import useRoomState from "@sentrei/video/hooks/useRoomState";

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: "#6db1ff",
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.8em",
  },
});

export default function ReconnectingNotification(): JSX.Element {
  const classes = useStyles();
  const roomState = useRoomState();

  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      open={roomState === "reconnecting"}
    >
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span className={classes.message}>
            <InfoIcon className={classes.icon} />
            Reconnecting&hellip;
          </span>
        }
      />
    </Snackbar>
  );
}
