import {styled} from "@material-ui/core/styles";
import React, {useRef, useEffect} from "react";

import {Track} from "twilio-video";

import {IVideoTrack} from "@sentrei/video/types";

const Video = styled("video")({
  width: "100%",
  maxHeight: "100%",
  objectFit: "contain",
});

interface VideoTrackProps {
  track: IVideoTrack;
  // eslint-disable-next-line react/require-default-props
  isLocal?: boolean;
  // eslint-disable-next-line react/require-default-props
  priority?: Track.Priority | null;
}

export default function VideoTrack({
  track,
  isLocal,
  priority,
}: VideoTrackProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return (): void => {
      track.detach(el);
      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  // The local video track is mirrored.
  const isFrontFacing =
    track.mediaStreamTrack.getSettings().facingMode !== "environment";
  const style = isLocal && isFrontFacing ? {transform: "rotateY(180deg)"} : {};

  return <Video ref={ref} style={style} />;
}
