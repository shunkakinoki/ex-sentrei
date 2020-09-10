import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import ToggleFullscreenButton from "./ToggleFullScreenButton/ToggleFullScreenButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "./Menu/Menu";
import issueRoomToken from "@sentrei/common/services/issueRoomToken";
import {useAppState} from "@sentrei/video/state";
import useRoomState from "@sentrei/video/hooks/useRoomState/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext/useVideoContext";
import {Typography} from "@material-ui/core";
import FlipCameraButton from "./FlipCameraButton/FlipCameraButton";
import LocalAudioLevelIndicator from "./DeviceSelector/LocalAudioLevelIndicator/LocalAudioLevelIndicator";
import {StateContextType} from "@sentrei/video/state";

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

  const [name, setName] = useState<string>(user?.displayName || "");
  const [roomName, setRoomName] = useState<string>(roomId);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    issueRoomToken(roomName).then(token => {
      connect(token);
    });
  };

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
        {roomState === "disconnected" ? (
          <form className={classes.form} onSubmit={handleSubmit}>
            {window.location.search.includes("customIdentity=true") ||
            !user?.displayName ? (
              <TextField
                id="menu-name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={handleNameChange}
                margin="dense"
              />
            ) : (
              <Typography className={classes.displayName} variant="body1">
                {user.displayName}
              </Typography>
            )}
            <TextField
              disabled
              id="menu-room"
              label="Room"
              className={classes.textField}
              value={roomName}
              onChange={handleRoomNameChange}
              margin="dense"
            />
            <Button
              className={classes.joinButton}
              type="submit"
              color="primary"
              variant="contained"
              disabled={
                isAcquiringLocalTracks ||
                isConnecting ||
                !name ||
                !roomName ||
                isFetching
              }
            >
              Join Room
            </Button>
            {(isConnecting || isFetching) && (
              <CircularProgress className={classes.loadingSpinner} />
            )}
          </form>
        ) : (
          <h3>{roomName}</h3>
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
