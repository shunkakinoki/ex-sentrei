import {renderHook} from "@testing-library/react-hooks";

import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import useMainSpeaker from "./useMainSpeaker";

import {EventEmitter} from "events";

jest.mock("@sentrei/video/hooks/useVideoContext");
jest.mock("@sentrei/video/components/VideoProvider/useSelectedParticipant");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseVideoContext = useVideoContext as jest.Mock<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockSelectedParticipant = useSelectedParticipant as jest.Mock<any>;

describe("the useMainSpeaker hook", () => {
  mockSelectedParticipant.mockImplementation(() => [null]);

  it("should return the dominant speaker if it exists", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.dominantSpeaker = "dominantSpeaker";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockRoom.participants = new Map([[0, "participant"]]) as any;
    mockRoom.localParticipant = "localParticipant";
    mockUseVideoContext.mockImplementation(() => ({room: mockRoom}));
    const {result} = renderHook(useMainSpeaker);
    expect(result.current).toBe("dominantSpeaker");
  });

  it("should return the first remote participant if it exists", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.dominantSpeaker = null;
    mockRoom.participants = new Map([
      [0, "participant"],
      [1, "secondParticipant"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]) as any;
    mockRoom.localParticipant = "localParticipant";
    mockUseVideoContext.mockImplementation(() => ({room: mockRoom}));
    const {result} = renderHook(useMainSpeaker);
    expect(result.current).toBe("participant");
  });

  it("should return the local participant if it exists", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.dominantSpeaker = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockRoom.participants = new Map() as any;
    mockRoom.localParticipant = "localParticipant";
    mockUseVideoContext.mockImplementation(() => ({room: mockRoom}));
    const {result} = renderHook(useMainSpeaker);
    expect(result.current).toBe("localParticipant");
  });

  it("should return the selected participant if it exists", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.dominantSpeaker = "dominantSpeaker";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockRoom.participants = new Map([[0, "participant"]]) as any;
    mockRoom.localParticipant = "localParticipant";
    mockUseVideoContext.mockImplementation(() => ({room: mockRoom}));
    mockSelectedParticipant.mockImplementation(() => [
      "mockSelectedParticipant",
    ]);
    const {result} = renderHook(useMainSpeaker);
    expect(result.current).toBe("mockSelectedParticipant");
  });
});
