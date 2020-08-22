import {Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

import CircularProgress from "@material-ui/core/CircularProgress";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Toolbar from "@material-ui/core/Toolbar";
import React, {ChangeEvent, useState} from "react";

import useRoomState from "@sentrei/video/hooks/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import {useAppState} from "@sentrei/video/state";

import LocalAudioLevelIndicator from "./DeviceSelector/LocalAudioLevelIndicator";
import FlipCameraButton from "./FlipCameraButton";
import Menu from "./Menu";
import ToggleFullscreenButton from "./ToggleFullScreenButton";

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

export default function MenuBar(): JSX.Element {
  const classes = useStyles();
  const {profile, isFetching} = useAppState();
  const {isConnecting} = useVideoContext();
  const roomState = useRoomState();

  const [name, setName] = useState<string>(profile?.name || "");
  const [roomName] = useState<string>("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
        {roomState === "disconnected" ? (
          <form className={classes.form}>
            {window.location.search.includes("customIdentity=true") ||
            !profile?.name ? (
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
                {profile.name}
              </Typography>
            )}
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
