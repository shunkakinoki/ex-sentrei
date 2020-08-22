import {shallow} from "enzyme";
import React from "react";

import useLocalAudioToggle from "@sentrei/video/hooks/useLocalAudioToggle";

import ToggleAudioButton from "./ToggleAudioButton";

jest.mock("@sentrei/video/hooks/useLocalAudioToggle");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseLocalAudioToggle = useLocalAudioToggle as jest.Mock<any>;

describe("the ToggleAudioButton component", () => {
  it("should render correctly when audio is enabled", () => {
    mockUseLocalAudioToggle.mockImplementation(() => [true, (): void => {}]);
    const wrapper = shallow(<ToggleAudioButton />);
    expect(wrapper.find("MicIcon").exists()).toBe(true);
    expect(wrapper.find("MicOffIcon").exists()).toBe(false);
    expect(
      wrapper.find("WithStyles(ForwardRef(Tooltip))").at(0).prop("title"),
    ).toBe("Mute Audio");
  });

  it("should render correctly when audio is disabled", () => {
    mockUseLocalAudioToggle.mockImplementation(() => [false, (): void => {}]);
    const wrapper = shallow(<ToggleAudioButton />);
    expect(wrapper.find("MicIcon").exists()).toBe(false);
    expect(wrapper.find("MicOffIcon").exists()).toBe(true);
    expect(
      wrapper.find("WithStyles(ForwardRef(Tooltip))").at(0).prop("title"),
    ).toBe("Unmute Audio");
  });

  it("should call the correct toggle function when clicked", () => {
    const mockFn = jest.fn();
    mockUseLocalAudioToggle.mockImplementation(() => [false, mockFn]);
    const wrapper = shallow(<ToggleAudioButton />);
    wrapper.find("WithStyles(ForwardRef(Fab))").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
