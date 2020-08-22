import React, {createContext, ReactNode} from "react";
import {
  CreateLocalTrackOptions,
  ConnectOptions,
  LocalAudioTrack,
  LocalVideoTrack,
  Room,
  TwilioError,
} from "twilio-video";

import {Callback, ErrorCallback} from "@sentrei/video/types";

// eslint-disable-next-line import/no-cycle
import AttachVisibilityHandler from "./AttachVisibilityHandler";
import useHandleOnDisconnect from "./useHandleOnDisconnect";
import useHandleRoomDisconnectionErrors from "./useHandleRoomDisconnectionErrors";
import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed";
import useLocalTracks from "./useLocalTracks";
import useRoom from "./useRoom";
import {SelectedParticipantProvider} from "./useSelectedParticipant";

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */

export interface IVideoContext {
  room: Room;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  getLocalVideoTrack: (
    newOptions?: CreateLocalTrackOptions,
  ) => Promise<LocalVideoTrack>;
  getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>;
  isAcquiringLocalTracks: boolean;
  removeLocalVideoTrack: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const VideoContext = createContext<IVideoContext>(null!);

interface VideoProviderProps {
  // eslint-disable-next-line react/require-default-props
  options?: ConnectOptions;
  onError: ErrorCallback;
  // eslint-disable-next-line react/require-default-props
  onDisconnect?: Callback;
  children: ReactNode;
}

export function VideoProvider({
  options,
  children,
  onError = (): void => {},
  onDisconnect = (): void => {},
}: VideoProviderProps): JSX.Element {
  const onErrorCallback = (error: TwilioError): void => {
    // eslint-disable-next-line no-console
    console.log(`ERROR: ${error.message}`, error);
    onError(error);
  };

  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalVideoTrack,
  } = useLocalTracks();
  const {room, isConnecting, connect} = useRoom(
    localTracks,
    onErrorCallback,
    options,
  );

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onDisconnect);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        onDisconnect,
        getLocalVideoTrack,
        getLocalAudioTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
      }}
    >
      <SelectedParticipantProvider room={room}>
        {children}
      </SelectedParticipantProvider>
      {/*
        The AttachVisibilityHandler component is using the useLocalVideoToggle hook
        which must be used within the VideoContext Provider.
      */}
      <AttachVisibilityHandler />
    </VideoContext.Provider>
  );
}
