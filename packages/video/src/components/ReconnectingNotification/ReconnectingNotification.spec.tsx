import {shallow} from "enzyme";
import React from "react";

import useRoomState from "@sentrei/video/hooks/useRoomState";

import ReconnectingNotification from "./ReconnectingNotification";

jest.mock("@sentrei/video/hooks/useRoomState");
const mockUseRoomState = useRoomState as jest.Mock<string>;

describe("the ReconnectingNotification component", () => {
  it('should not open Snackbar when room state is not "reconnecting"', () => {
    mockUseRoomState.mockImplementation(() => "connected");
    const wrapper = shallow(<ReconnectingNotification />);
    expect(wrapper.find({open: false}).exists()).toBe(true);
  });

  it('should open Snackbar when room state is "reconnecting"', () => {
    mockUseRoomState.mockImplementation(() => "reconnecting");
    const wrapper = shallow(<ReconnectingNotification />);
    expect(wrapper.find({open: true}).exists()).toBe(true);
  });
});
