/* eslint-disable @typescript-eslint/no-explicit-any */

import {shallow} from "enzyme";
import React from "react";

import ParticipantTracks from "@sentrei/video/components/ParticipantTracks";
import useSelectedParticipant from "@sentrei/video/components/VideoProvider/useSelectedParticipant";
import useMainSpeaker from "@sentrei/video/hooks/useMainSpeaker";
import useScreenShareParticipant from "@sentrei/video/hooks/useScreenShareParticipant";

import MainParticipant from "./MainParticipant";

jest.mock("@sentrei/video/hooks/useMainSpeaker");
jest.mock("@sentrei/video/components/VideoProvider/useSelectedParticipant");
jest.mock("@sentrei/video/hooks/useScreenShareParticipant");

const mockUseMainSpeaker = useMainSpeaker as jest.Mock<any>;
const mockUseSelectedParticipant = useSelectedParticipant as jest.Mock<any>;
const mockUseScreenShareParticipant = useScreenShareParticipant as jest.Mock<
  any
>;

describe("the MainParticipant component", () => {
  it("should set the videoPriority to high when the main participant is the selected participant", () => {
    const mockParticipant = {};
    mockUseMainSpeaker.mockImplementationOnce(() => mockParticipant);
    mockUseSelectedParticipant.mockImplementationOnce(() => [mockParticipant]);
    mockUseScreenShareParticipant.mockImplementationOnce(() => ({}));
    const wrapper = shallow(<MainParticipant />);
    expect(wrapper.find(ParticipantTracks).prop("videoPriority")).toBe("high");
  });

  it("should set the videoPriority to high when the main participant is sharing their screen", () => {
    const mockParticipant = {};
    mockUseMainSpeaker.mockImplementationOnce(() => mockParticipant);
    mockUseSelectedParticipant.mockImplementationOnce(() => [{}]);
    mockUseScreenShareParticipant.mockImplementationOnce(() => mockParticipant);
    const wrapper = shallow(<MainParticipant />);
    expect(wrapper.find(ParticipantTracks).prop("videoPriority")).toBe("high");
  });

  it("should set the videoPriority to null when the main participant is not the selected participant and they are not sharing their screen", () => {
    const mockParticipant = {};
    mockUseMainSpeaker.mockImplementationOnce(() => mockParticipant);
    mockUseSelectedParticipant.mockImplementationOnce(() => [{}]);
    mockUseScreenShareParticipant.mockImplementationOnce(() => ({}));
    const wrapper = shallow(<MainParticipant />);
    expect(wrapper.find(ParticipantTracks).prop("videoPriority")).toBe(null);
  });
});
