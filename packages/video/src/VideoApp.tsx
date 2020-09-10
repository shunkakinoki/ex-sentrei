import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import App from "@sentrei/video/App";
import {useAppState} from "@sentrei/video/state";
import ErrorDialog from "@sentrei/video/components/ErrorDialog/ErrorDialog";
import "@sentrei/video/types";
import {VideoProvider} from "@sentrei/video/components/VideoProvider";
import useConnectionOptions from "@sentrei/video/utils/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "@sentrei/video/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";
import VideoTheme from "@sentrei/common/containers/VideoTheme";

const VideoApp = () => {
  const {error, setError} = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <ThemeProvider theme={VideoTheme}>
      <Paper>
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            <App />
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </Paper>
    </ThemeProvider>
  );
};

export default VideoApp;
