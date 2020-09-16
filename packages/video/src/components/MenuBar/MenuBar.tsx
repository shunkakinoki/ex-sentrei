import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleFullscreenButton from "./ToggleFullScreenButton/ToggleFullScreenButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "./Menu/Menu";
import issueRoomToken from "@sentrei/common/services/issueRoomToken";
import {useAppState} from "@sentrei/video/state";
import useRoomState from "@sentrei/video/hooks/useRoomState/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext/useVideoContext";
import FlipCameraButton from "./FlipCameraButton/FlipCameraButton";
import LocalAudioLevelIndicator from "./DeviceSelector/LocalAudioLevelIndicator/LocalAudioLevelIndicator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
    },
    toolbar: {
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
    rightButtonContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        marginLeft: "2.2em",
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 200,
    },
    loadingSpinner: {
      marginLeft: "1em",
    },
    displayName: {
      margin: "1.1em 0.6em",
      minWidth: "200px",
      fontWeight: 600,
    },
    joinButton: {
      margin: "1em",
    },
  }),
);

export default function MenuBar() {
  const classes = useStyles();
  const {user, roomId, getToken, isFetching} = useAppState();
  const {isConnecting, connect, isAcquiringLocalTracks} = useVideoContext();
  const roomState = useRoomState();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    issueRoomToken(roomId).then(token => {
      connect(token);
    });
  };

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
        {roomState === "disconnected" ? (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Button
              className={classes.joinButton}
              type="submit"
              color="primary"
              variant="contained"
              disabled={isAcquiringLocalTracks || isConnecting || isFetching}
            >
              Join Room
            </Button>
            {(isConnecting || isFetching) && (
              <CircularProgress className={classes.loadingSpinner} />
            )}
          </form>
        ) : (
          <h3>{roomId}</h3>
        )}
        <div className={classes.rightButtonContainer}>
          <FlipCameraButton />
          <LocalAudioLevelIndicator />
          <ToggleFullscreenButton />
          <Menu />
        </div>
      </Toolbar>
    </AppBar>
  );
}
