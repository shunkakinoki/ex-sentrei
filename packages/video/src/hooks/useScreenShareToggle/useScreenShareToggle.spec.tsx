import {renderHook, act} from "@testing-library/react-hooks";

import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import useScreenShareToggle from "./useScreenShareToggle";

import {EventEmitter} from "events";

jest.mock("@sentrei/video/hooks/useVideoContext");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedVideoContext = useVideoContext as jest.Mock<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLocalParticipant = new EventEmitter() as any;
mockLocalParticipant.publishTrack = jest.fn(() =>
  Promise.resolve("mockPublication"),
);
mockLocalParticipant.unpublishTrack = jest.fn();

mockedVideoContext.mockImplementation(() => ({
  room: {
    localParticipant: mockLocalParticipant,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockTrack: any = {stop: jest.fn()};

const mockMediaDevices = {
  value: {
    getDisplayMedia: jest.fn(() =>
      Promise.resolve({
        getTracks: jest.fn(() => [mockTrack]),
      }),
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
};

Object.defineProperty(navigator, "mediaDevices", mockMediaDevices);

describe("the useScreenShareToggle hook", () => {
  beforeEach(() => {
    delete mockTrack.onended;
    jest.clearAllMocks();
  });

  it("should return a default value of false", () => {
    const {result} = renderHook(useScreenShareToggle);
    expect(result.current).toEqual([false, expect.any(Function)]);
  });

  describe("toggle function", () => {
    it("should call localParticipant.publishTrack with the correct arguments when isSharing is false", async () => {
      const {result, waitForNextUpdate} = renderHook(useScreenShareToggle);
      result.current[1]();
      await waitForNextUpdate();
      expect(navigator.mediaDevices.getDisplayMedia).toHaveBeenCalled();
      expect(mockLocalParticipant.publishTrack).toHaveBeenCalledWith(
        mockTrack,
        {name: "screen", priority: "low"},
      );
      expect(result.current[0]).toEqual(true);
    });

    it("should correctly stop screen sharing when isSharing is true", async () => {
      const localParticipantSpy = jest.spyOn(mockLocalParticipant, "emit");
      const {result, waitForNextUpdate} = renderHook(useScreenShareToggle);
      expect(mockTrack.onended).toBeUndefined();
      result.current[1]();
      await waitForNextUpdate();
      expect(result.current[0]).toEqual(true);
      act(() => {
        result.current[1]();
      });
      expect(mockLocalParticipant.unpublishTrack).toHaveBeenCalledWith(
        mockTrack,
      );
      expect(localParticipantSpy).toHaveBeenCalledWith(
        "trackUnpublished",
        "mockPublication",
      );
      expect(mockTrack.stop).toHaveBeenCalled();
      expect(result.current[0]).toEqual(false);
    });

    describe("onended function", () => {
      it("should correctly stop screen sharing when called", async () => {
        const localParticipantSpy = jest.spyOn(mockLocalParticipant, "emit");
        const {result, waitForNextUpdate} = renderHook(useScreenShareToggle);
        expect(mockTrack.onended).toBeUndefined();
        result.current[1]();
        await waitForNextUpdate();
        expect(mockTrack.onended).toEqual(expect.any(Function));
        act(() => {
          mockTrack.onended();
        });
        expect(mockLocalParticipant.unpublishTrack).toHaveBeenCalledWith(
          mockTrack,
        );
        expect(localParticipantSpy).toHaveBeenCalledWith(
          "trackUnpublished",
          "mockPublication",
        );
        expect(mockTrack.stop).toHaveBeenCalled();
        expect(result.current[0]).toEqual(false);
      });
    });
  });
});
