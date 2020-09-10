import React from "react";

import App from "@sentrei/video/App";
import {useAppState} from "@sentrei/video/state";
import ErrorDialog from "@sentrei/video/components/ErrorDialog/ErrorDialog";
import "@sentrei/video/types";
import {VideoProvider} from "@sentrei/video/components/VideoProvider";
import useConnectionOptions from "@sentrei/video/utils/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "@sentrei/video/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";

const VideoApp = () => {
  const {error, setError} = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <UnsupportedBrowserWarning>
      <VideoProvider options={connectionOptions} onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <App />
      </VideoProvider>
    </UnsupportedBrowserWarning>
  );
};

export default VideoApp;
