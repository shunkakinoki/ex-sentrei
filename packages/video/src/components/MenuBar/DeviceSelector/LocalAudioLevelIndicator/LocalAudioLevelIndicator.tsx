import React from "react";
import {LocalAudioTrack} from "twilio-video";
import useVideoContext from "@sentrei/video/hooks/useVideoContext/useVideoContext";
import AudioLevelIndicator from "@sentrei/video/components/AudioLevelIndicator/AudioLevelIndicator";

export default function LocalAudioLevelIndicator() {
  const {localTracks} = useVideoContext();
  const audioTrack = localTracks.find(
    track => track.kind === "audio",
  ) as LocalAudioTrack;

  return <AudioLevelIndicator size={30} audioTrack={audioTrack} />;
}
