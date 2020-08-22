import {act, renderHook} from "@testing-library/react-hooks";

import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed";

import EventEmitter from "events";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MockRoom(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRoom = new EventEmitter() as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockLocalParticipant = new EventEmitter() as any;

  mockRoom.localParticipant = mockLocalParticipant;
  return mockRoom;
}

describe("the useHandleTrackPublicationFailed hook", () => {
  let mockRoom = MockRoom();

  it('should react to the localParticipant "trackPublicationFailed" event and invoke onError callback', () => {
    const mockOnError = jest.fn();
    renderHook(() => useHandleTrackPublicationFailed(mockRoom, mockOnError));
    act(() => {
      mockRoom.localParticipant.emit("trackPublicationFailed", "mockTrack");
    });
    expect(mockOnError).toHaveBeenCalledWith("mockTrack");
  });

  it("should tear down old listeners when receiving a new room", () => {
    const originalMockRoom = mockRoom;
    const {rerender} = renderHook(() =>
      useHandleTrackPublicationFailed(mockRoom, () => {}),
    );
    expect(
      originalMockRoom.localParticipant.listenerCount("trackPublicationFailed"),
    ).toBe(1);

    act(() => {
      mockRoom = MockRoom();
    });

    rerender();

    expect(
      originalMockRoom.localParticipant.listenerCount("trackPublicationFailed"),
    ).toBe(0);
    expect(
      mockRoom.localParticipant.listenerCount("trackPublicationFailed"),
    ).toBe(1);
  });

  it("should clean up listeners on unmount", () => {
    const {unmount} = renderHook(() =>
      useHandleTrackPublicationFailed(mockRoom, () => {}),
    );
    unmount();
    expect(
      mockRoom.localParticipant.listenerCount("trackPublicationFailed"),
    ).toBe(0);
  });
});
