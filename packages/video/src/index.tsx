import React from "react";

import App from "./App";
import {useAppState} from "./state";
import ErrorDialog from "./components/ErrorDialog/ErrorDialog";
import "./types";
import {VideoProvider} from "./components/VideoProvider";
import useConnectionOptions from "./utils/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "./components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";

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
