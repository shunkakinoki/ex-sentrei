import React from "react";
import {LocalAudioTrack} from "twilio-video";

import AudioLevelIndicator from "@sentrei/video/components/AudioLevelIndicator";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

export default function LocalAudioLevelIndicator(): JSX.Element {
  const {localTracks} = useVideoContext();
  const audioTrack = localTracks.find(
    track => track.kind === "audio",
  ) as LocalAudioTrack;

  return <AudioLevelIndicator size={30} audioTrack={audioTrack} />;
}
