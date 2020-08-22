import {FormControl, MenuItem, Typography, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {LocalVideoTrack} from "twilio-video";

import {useVideoInputDevices} from "@sentrei/video/components/MenuBar/DeviceSelector/deviceHooks";
import VideoTrack from "@sentrei/video/components/VideoTrack";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

const useStyles = makeStyles({
  preview: {
    width: "150px",
    margin: "0.5em 0",
  },
});

export default function VideoInputList(): JSX.Element {
  const classes = useStyles();
  const videoInputDevices = useVideoInputDevices();
  const {
    room: {localParticipant},
    localTracks,
    getLocalVideoTrack,
  } = useVideoContext();

  const localVideoTrack = localTracks.find(
    track => track.kind === "video",
  ) as LocalVideoTrack;
  const localVideoInputDeviceId = localVideoTrack?.mediaStreamTrack.getSettings()
    .deviceId;

  function replaceTrack(newDeviceId: string): void {
    localVideoTrack?.stop();
    getLocalVideoTrack({deviceId: {exact: newDeviceId}}).then(newTrack => {
      if (localVideoTrack) {
        const localTrackPublication = localParticipant?.unpublishTrack(
          localVideoTrack,
        );
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant?.emit("trackUnpublished", localTrackPublication);
      }

      localParticipant?.publishTrack(newTrack);
    });
  }

  return (
    <div>
      {videoInputDevices.length > 1 ? (
        <FormControl>
          <Typography variant="h6">Video Input:</Typography>
          <Select
            onChange={(
              e: React.ChangeEvent<{
                name?: string | undefined;
                value: unknown;
              }>,
            ): void => replaceTrack(e.target.value as string)}
            value={localVideoInputDeviceId || ""}
          >
            {videoInputDevices.map(device => (
              <MenuItem value={device.deviceId} key={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Typography variant="h6">Video Input:</Typography>
          <Typography>
            {localVideoTrack?.mediaStreamTrack.label || "No Local Video"}
          </Typography>
        </>
      )}
      {localVideoTrack && (
        <div className={classes.preview}>
          <VideoTrack isLocal track={localVideoTrack} />
        </div>
      )}
    </div>
  );
}
