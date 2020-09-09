import Paper from "@material-ui/core/Paper";
import {ThemeProvider} from "@material-ui/core/styles";
import * as React from "react";

import VideoTheme from "@sentrei/common/containers/VideoTheme";
import App from "@sentrei/video/App";
import ErrorDialog from "@sentrei/video/components/ErrorDialog/ErrorDialog";
import UnsupportedBrowserWarning from "@sentrei/video/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";
import {VideoProvider} from "@sentrei/video/components/VideoProvider";
import {useAppState} from "@sentrei/video/state";
import useConnectionOptions from "@sentrei/video/utils/useConnectionOptions/useConnectionOptions";

export default function SentreiVideoApp({
  tokenId,
}: {
  tokenId: string;
}): JSX.Element {
  const {error, setError} = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <ThemeProvider theme={VideoTheme}>
      <Paper>
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog
              dismissError={(): void => setError(null)}
              error={error}
            />
            <App tokenId={tokenId} />
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </Paper>
    </ThemeProvider>
  );
}
