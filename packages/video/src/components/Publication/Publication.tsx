import React from "react";

import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from "twilio-video";

import AudioTrack from "@sentrei/video/components/AudioTrack";
import VideoTrack from "@sentrei/video/components/VideoTrack";
import useTrack from "@sentrei/video/hooks/useTrack";

import {IVideoTrack} from "@sentrei/video/types";

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocal: boolean;
  disableAudio?: boolean;
  videoPriority?: Track.Priority | null;
}

export default function Publication({
  // eslint-disable-next-line react/prop-types
  publication,
  // eslint-disable-next-line react/prop-types
  isLocal,
  // eslint-disable-next-line react/prop-types
  disableAudio,
  // eslint-disable-next-line react/prop-types
  videoPriority,
}: PublicationProps): JSX.Element | null {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case "video":
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={track.name.includes("camera") && isLocal}
        />
      );
    case "audio":
      return disableAudio ? null : <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
}
