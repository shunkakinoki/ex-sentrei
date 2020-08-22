import IconButton from "@material-ui/core/IconButton";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import fscreen from "fscreen";
import React from "react";

import useFullScreenToggle from "@sentrei/video/hooks/useFullScreenToggle";

export default function ToggleFullscreenButton(): JSX.Element | null {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return fscreen.fullscreenEnabled ? (
    <IconButton aria-label="full screen" onClick={toggleFullScreen}>
      {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  ) : null;
}
