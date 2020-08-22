import Paper from "@material-ui/core/Paper";
import {ThemeProvider} from "@material-ui/core/styles";
import * as React from "react";

import VideoTheme from "@sentrei/common/containers/VideoTheme";
import Profile from "@sentrei/types/models/Profile";
import App from "@sentrei/video/App";
import ErrorDialog from "@sentrei/video/components/ErrorDialog/ErrorDialog";
import UnsupportedBrowserWarning from "@sentrei/video/components/UnsupportedBrowserWarning";
import {VideoProvider} from "@sentrei/video/components/VideoProvider";
import {useAppState} from "@sentrei/video/state";
import generateConnectionOptions from "@sentrei/video/utils/generateConnectionOptions";

export default function SentreiVideoApp({
  tokenId,
  profile,
}: {
  tokenId: string;
  profile: Profile.Get;
}): JSX.Element {
  const {error, setError, settings} = useAppState();
  const connectionOptions = generateConnectionOptions(settings);

  return (
    <ThemeProvider theme={VideoTheme}>
      <Paper>
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog
              dismissError={(): void => setError(null)}
              error={error}
            />
            <App tokenId={tokenId} profile={profile} />
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </Paper>
    </ThemeProvider>
  );
}
