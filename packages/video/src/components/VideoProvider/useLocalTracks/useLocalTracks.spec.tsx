import {act, renderHook} from "@testing-library/react-hooks";

import Video from "twilio-video";

import useLocalTracks from "./useLocalTracks";

import {EventEmitter} from "events";

describe("the useLocalTracks hook", () => {
  afterEach(jest.clearAllMocks);

  it("should return an array of tracks and two functions", async () => {
    const {result, waitForNextUpdate} = renderHook(useLocalTracks);
    expect(result.current.localTracks).toEqual([]);
    await waitForNextUpdate();
    expect(result.current.localTracks).toEqual([
      expect.any(EventEmitter),
      expect.any(EventEmitter),
    ]);
    expect(result.current.getLocalVideoTrack).toEqual(expect.any(Function));
  });

  it("should create local tracks when loaded", async () => {
    Date.now = (): number => 123456;
    const {waitForNextUpdate} = renderHook(useLocalTracks);
    await waitForNextUpdate();
    expect(Video.createLocalTracks).toHaveBeenCalledWith({
      audio: true,
      video: {
        frameRate: 24,
        width: 1280,
        height: 720,
        name: "camera-123456",
      },
    });
  });

  describe("the removeLocalVideoTrack function", () => {
    it("should call videoTrack.stop() and remove the videoTrack from state", async () => {
      const {result, waitForNextUpdate} = renderHook(useLocalTracks);
      await waitForNextUpdate();
      const initialVideoTrack = result.current.localTracks.find(
        track => track.kind === "video",
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(initialVideoTrack!.stop).not.toHaveBeenCalled();
      expect(initialVideoTrack).toBeTruthy();

      act(() => {
        result.current.removeLocalVideoTrack();
      });

      expect(
        result.current.localTracks.some(track => track.kind === "video"),
      ).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(initialVideoTrack!.stop).toHaveBeenCalled();
    });
  });
});
