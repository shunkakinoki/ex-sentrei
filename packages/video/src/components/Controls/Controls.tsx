import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";
import useRoomState from "@sentrei/video/hooks/useRoomState";

import EndCallButton from "./EndCallButton";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
import ToggleScreenShareButton from "./ToogleScreenShareButton";

import useIsUserActive from "./useIsUserActive";

const useStyles = makeStyles((theme: SentreiTheme) =>
  createStyles({
    container: {
      display: "flex",
      position: "absolute",
      right: "50%",
      transform: "translate(50%, 30px)",
      bottom: "50px",
      zIndex: 1,
      transition: "opacity 1.2s, transform 1.2s, visibility 0s 1.2s",
      opacity: 0,
      visibility: "hidden",
      maxWidth: "min-content",
      "&.showControls, &:hover": {
        transition: "opacity 0.6s, transform 0.6s, visibility 0s",
        opacity: 1,
        visibility: "visible",
        transform: "translate(50%, 0px)",
      },
      [theme.breakpoints.down("xs")]: {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        bottom: `${theme.sidebarMobileHeight + 3}px`,
      },
    },
  }),
);

export default function Controls(): JSX.Element {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === "reconnecting";
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === "disconnected";

  return (
    <div className={clsx(classes.container, {showControls})}>
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      {roomState !== "disconnected" && (
        <>
          <ToggleScreenShareButton disabled={isReconnecting} />
          <EndCallButton />
        </>
      )}
    </div>
  );
}
