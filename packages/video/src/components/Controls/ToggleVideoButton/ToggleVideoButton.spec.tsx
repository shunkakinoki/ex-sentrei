import {shallow} from "enzyme";
import React from "react";

import useLocalVideoToggle from "@sentrei/video/hooks/useLocalVideoToggle";

import ToggleVideoButton from "./ToggleVideoButton";

jest.mock("@sentrei/video/hooks/useLocalVideoToggle");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseLocalVideoToggle = useLocalVideoToggle as jest.Mock<any>;

describe("the ToggleVideoButton component", () => {
  it("should render correctly when video is enabled", () => {
    mockUseLocalVideoToggle.mockImplementation(() => [true, (): void => {}]);
    const wrapper = shallow(<ToggleVideoButton />);
    expect(wrapper.find("VideocamIcon").exists()).toBe(true);
    expect(wrapper.find("VideocamOffIcon").exists()).toBe(false);
    expect(wrapper.prop("title")).toBe("Mute Video");
  });

  it("should render correctly when video is disabled", () => {
    mockUseLocalVideoToggle.mockImplementation(() => [false, (): void => {}]);
    const wrapper = shallow(<ToggleVideoButton />);
    expect(wrapper.find("VideocamIcon").exists()).toBe(false);
    expect(wrapper.find("VideocamOffIcon").exists()).toBe(true);
    expect(wrapper.prop("title")).toBe("Unmute Video");
  });

  it("should call the correct toggle function when clicked", () => {
    const mockFn = jest.fn();
    mockUseLocalVideoToggle.mockImplementation(() => [false, mockFn]);
    const wrapper = shallow(<ToggleVideoButton />);
    wrapper.find("WithStyles(ForwardRef(Fab))").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("should throttle the toggle function to 200ms", () => {
    const mockFn = jest.fn();
    mockUseLocalVideoToggle.mockImplementation(() => [false, mockFn]);
    const wrapper = shallow(<ToggleVideoButton />);
    const button = wrapper.find("WithStyles(ForwardRef(Fab))");
    Date.now = (): number => 100000;
    button.simulate("click"); // Should register
    Date.now = (): number => 100100;
    button.simulate("click"); // Should be ignored
    Date.now = (): number => 100300;
    button.simulate("click"); // Should register
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
