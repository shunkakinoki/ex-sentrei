import {act, renderHook} from "@testing-library/react-hooks";

import useParticipantNetworkQualityLevel from "./useParticipantNetworkQualityLevel";

import EventEmitter from "events";

describe("the useParticipantNetworkQualityLevel hook", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockParticipant: any;

  beforeEach(() => {
    mockParticipant = new EventEmitter();
  });

  it("should return mockParticipant.networkQualityLevel by default", () => {
    mockParticipant.networkQualityLevel = 4;
    const {result} = renderHook(() =>
      useParticipantNetworkQualityLevel(mockParticipant),
    );
    expect(result.current).toBe(4);
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('should return respond to "networkQualityLevelChanged" events', async () => {
    mockParticipant.networkQualityLevel = 4;
    const {result} = renderHook(() =>
      useParticipantNetworkQualityLevel(mockParticipant),
    );
    act(() => {
      mockParticipant.emit("networkQualityLevelChanged", 3);
    });
    expect(result.current).toBe(3);
  });

  it("should clean up listeners on unmount", () => {
    mockParticipant.networkQualityLevel = 4;
    const {unmount} = renderHook(() =>
      useParticipantNetworkQualityLevel(mockParticipant),
    );
    unmount();
    expect(mockParticipant.listenerCount("networkQualityLevelChanged")).toBe(0);
  });
});
