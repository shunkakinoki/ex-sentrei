import {useCallback, useEffect, useState} from "react";
import Video, {
  LocalVideoTrack,
  LocalAudioTrack,
  CreateLocalTrackOptions,
} from "twilio-video";

export default function useLocalTracks(): {
  localTracks: (Video.LocalVideoTrack | Video.LocalAudioTrack)[];
  getLocalVideoTrack: (
    newOptions?: Video.CreateLocalTrackOptions | undefined,
  ) => Promise<Video.LocalVideoTrack>;
  getLocalAudioTrack: (
    deviceId?: string | undefined,
  ) => Promise<Video.LocalAudioTrack>;
  isAcquiringLocalTracks: boolean;
  removeLocalVideoTrack: () => void;
} {
  const [audioTrack, setAudioTrack] = useState<LocalAudioTrack>();
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);

  const getLocalAudioTrack = useCallback((deviceId?: string) => {
    const options: CreateLocalTrackOptions = {};

    if (deviceId) {
      options.deviceId = {exact: deviceId};
    }

    return Video.createLocalAudioTrack(options).then(newTrack => {
      setAudioTrack(newTrack);
      return newTrack;
    });
  }, []);

  const getLocalVideoTrack = useCallback(
    (newOptions?: CreateLocalTrackOptions) => {
      // In the DeviceSelector and FlipCameraButton components, a new video track is created,
      // then the old track is unpublished and the new track is published. Unpublishing the old
      // track and publishing the new track at the same time sometimes causes a conflict when the
      // track name is 'camera', so here we append a timestamp to the track name to avoid the
      // conflict.
      const options: CreateLocalTrackOptions = {
        frameRate: 24,
        height: 720,
        width: 1280,
        name: `camera-${Date.now()}`,
        ...newOptions,
      };

      return Video.createLocalVideoTrack(options).then(newTrack => {
        setVideoTrack(newTrack);
        return newTrack;
      });
    },
    [],
  );

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);

  useEffect(() => {
    setIsAcquiringLocalTracks(true);
    Video.createLocalTracks({
      video: {
        frameRate: 24,
        height: 720,
        width: 1280,
        name: `camera-${Date.now()}`,
      },
      audio: true,
    })
      .then(tracks => {
        // eslint-disable-next-line no-shadow
        const videoTrack = tracks.find(track => track.kind === "video");
        // eslint-disable-next-line no-shadow
        const audioTrack = tracks.find(track => track.kind === "audio");
        if (videoTrack) {
          setVideoTrack(videoTrack as LocalVideoTrack);
        }
        if (audioTrack) {
          setAudioTrack(audioTrack as LocalAudioTrack);
        }
      })
      .finally(() => setIsAcquiringLocalTracks(false));
  }, []);

  const localTracks = [audioTrack, videoTrack].filter(
    track => track !== undefined,
  ) as (LocalAudioTrack | LocalVideoTrack)[];

  return {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalVideoTrack,
  };
}
