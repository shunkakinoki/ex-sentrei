import React from "react";
import {LocalVideoTrack} from "twilio-video";

import VideoTrack from "@sentrei/video/components/VideoTrack";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function LocalVideoPreview(): JSX.Element | null {
  const {localTracks} = useVideoContext();

  const videoTrack = localTracks.find(track =>
    track.name.includes("camera"),
  ) as LocalVideoTrack;

  return videoTrack ? <VideoTrack track={videoTrack} isLocal /> : null;
}
