/* eslint-disable react/prop-types */

import {renderHook} from "@testing-library/react-hooks";
import React from "react";
import {Room, TwilioError} from "twilio-video";

import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import useHandleOnDisconnect from "./useHandleOnDisconnect";
import useHandleRoomDisconnectionErrors from "./useHandleRoomDisconnectionErrors";
import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed";
import useLocalTracks from "./useLocalTracks";
import useRoom from "./useRoom";

import {EventEmitter} from "events";

import {VideoProvider} from "./index";

const mockRoom = new EventEmitter() as Room;
const mockOnDisconnect = jest.fn();
jest.mock("./useRoom", () =>
  jest.fn(() => ({room: mockRoom, isConnecting: false})),
);
jest.mock("./useLocalTracks", () =>
  jest.fn(() => ({
    localTracks: [{name: "mockTrack"}],
    getLocalVideoTrack: jest.fn(),
  })),
);
jest.mock("./useHandleRoomDisconnectionErrors");
jest.mock("./useHandleTrackPublicationFailed");
jest.mock("./useHandleTrackPublicationFailed");
jest.mock("./useHandleOnDisconnect");

describe("the VideoProvider component", () => {
  it("should correctly return the Video Context object", () => {
    const wrapper: React.FC = ({children}) => (
      <VideoProvider
        onError={(): void => {}}
        onDisconnect={mockOnDisconnect}
        options={{dominantSpeaker: true}}
      >
        {children}
      </VideoProvider>
    );
    const {result} = renderHook(useVideoContext, {wrapper});
    expect(result.current).toEqual({
      isConnecting: false,
      localTracks: [{name: "mockTrack"}],
      room: mockRoom,
      onError: expect.any(Function),
      onDisconnect: mockOnDisconnect,
      getLocalVideoTrack: expect.any(Function),
    });
    expect(useRoom).toHaveBeenCalledWith(
      [{name: "mockTrack"}],
      expect.any(Function),
      {
        dominantSpeaker: true,
      },
    );
    expect(useLocalTracks).toHaveBeenCalled();
    expect(useHandleRoomDisconnectionErrors).toHaveBeenCalledWith(
      mockRoom,
      expect.any(Function),
    );
    expect(useHandleTrackPublicationFailed).toHaveBeenCalledWith(
      mockRoom,
      expect.any(Function),
    );
    expect(useHandleOnDisconnect).toHaveBeenCalledWith(
      mockRoom,
      mockOnDisconnect,
    );
  });

  it("should call the onError function when there is an error", () => {
    const mockOnError = jest.fn();
    const wrapper: React.FC = ({children}) => (
      <VideoProvider
        onError={mockOnError}
        onDisconnect={mockOnDisconnect}
        options={{dominantSpeaker: true}}
      >
        {children}
      </VideoProvider>
    );
    const {result} = renderHook(useVideoContext, {wrapper});
    result.current.onError({} as TwilioError);
    expect(mockOnError).toHaveBeenCalledWith({});
  });
});
