import {shallow} from "enzyme";
import React from "react";

import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import ParticipantStrip from "./ParticipantStrip";

import EventEmitter from "events";

jest.mock("@sentrei/video/hooks/useVideoContext");
jest.mock("@sentrei/video/components/VideoProvider/useSelectedParticipant");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedVideoContext = useVideoContext as jest.Mock<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseSelectedParticipant = useSelectedParticipant as jest.Mock<any>;

describe("the ParticipantStrip component", () => {
  mockUseSelectedParticipant.mockImplementation(() => [null, (): void => {}]);

  it("should correctly render ParticipantInfo components", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.participants = new Map([
      [0, {sid: 0}],
      [1, {sid: 1}],
    ]);
    mockRoom.localParticipant = "localParticipant";
    mockedVideoContext.mockImplementation(() => ({room: mockRoom}));
    const wrapper = shallow(<ParticipantStrip />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should add the isSelected prop to the local participant when it is selected", () => {
    mockUseSelectedParticipant.mockImplementation(() => [
      "localParticipant",
      (): void => {},
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.participants = new Map([
      [0, {sid: 0}],
      [1, {sid: 1}],
    ]);
    mockRoom.localParticipant = "localParticipant";
    mockedVideoContext.mockImplementation(() => ({room: mockRoom}));
    const wrapper = shallow(<ParticipantStrip />);
    expect(wrapper.find("Participant").at(0).prop("isSelected")).toBe(true);
  });

  it("should add the isSelected prop to the first remote participant when it is selected", () => {
    const mockParticipant = {sid: 0};
    mockUseSelectedParticipant.mockImplementation(() => [
      mockParticipant,
      (): void => {},
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRoom: any = new EventEmitter();
    mockRoom.participants = new Map([
      [0, mockParticipant],
      [1, {sid: 1}],
    ]);
    mockRoom.localParticipant = "localParticipant";
    mockedVideoContext.mockImplementation(() => ({room: mockRoom}));
    const wrapper = shallow(<ParticipantStrip />);
    expect(wrapper.find("Participant").at(1).prop("isSelected")).toBe(true);
  });
});
