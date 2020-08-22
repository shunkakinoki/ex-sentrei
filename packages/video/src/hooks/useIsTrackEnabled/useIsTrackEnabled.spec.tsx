import {act, renderHook} from "@testing-library/react-hooks";

import useIsTrackEnabled from "./useIsTrackEnabled";

import EventEmitter from "events";

describe("the useIsTrackEnabled hook", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockTrack: any;

  beforeEach(() => {
    mockTrack = new EventEmitter();
  });

  it("should return false when track is undefined", () => {
    const {result} = renderHook(() => useIsTrackEnabled(undefined));
    expect(result.current).toBe(false);
  });

  it("should return mockTrack.isEnabled by default", () => {
    mockTrack.isEnabled = false;
    const {result} = renderHook(() => useIsTrackEnabled(mockTrack));
    expect(result.current).toBe(false);
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('should return respond to "subscribed" events', async () => {
    mockTrack.isEnabled = false;
    const {result} = renderHook(() => useIsTrackEnabled(mockTrack));
    act(() => {
      mockTrack.emit("enabled");
    });
    expect(result.current).toBe(true);
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('should return respond to "unsubscribed" events', async () => {
    mockTrack.isEnabled = true;
    const {result} = renderHook(() => useIsTrackEnabled(mockTrack));
    act(() => {
      mockTrack.emit("disabled");
    });
    expect(result.current).toBe(false);
  });

  it("should clean up listeners on unmount", () => {
    mockTrack.isEnabled = "mockTrack";
    const {unmount} = renderHook(() => useIsTrackEnabled(mockTrack));
    unmount();
    expect(mockTrack.listenerCount("enabled")).toBe(0);
    expect(mockTrack.listenerCount("disabled")).toBe(0);
  });
});
