import {MenuItem} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import {shallow} from "enzyme";
import React from "react";

import UserAvatar from "@sentrei/video/components/MenuBar/UserAvatar";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import {useAppState} from "@sentrei/video/state";

import Menu from "./Menu";

jest.mock("@sentrei/video/state");
jest.mock("@sentrei/video/hooks/useVideoContext");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseAppState = useAppState as jest.Mock<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseVideoContext = useVideoContext as jest.Mock<any>;

describe("the Menu component", () => {
  const mockDisconnect = jest.fn();
  const mockTrack = {stop: jest.fn()};
  mockUseVideoContext.mockImplementation(() => ({
    room: {disconnect: mockDisconnect},
    localTracks: [mockTrack],
  }));

  describe("when there is a profile", () => {
    it("should render the ProfileAvatar component", () => {
      mockUseAppState.mockImplementation(() => ({
        profile: {},
      }));
      const wrapper = shallow(<Menu />);
      expect(wrapper.exists(UserAvatar)).toBe(true);
    });

    it("should display the profile name in the menu", () => {
      mockUseAppState.mockImplementation(() => ({
        profile: {name: "Test Profile"},
      }));
      const wrapper = shallow(<Menu />);
      expect(wrapper.contains("Test Profile")).toBe(true);
    });

    it("should disconnect from the room and stop all tracks on signout", () => {
      mockUseAppState.mockImplementation(() => ({
        profile: {name: "Test Profile"},
      }));
      const wrapper = shallow(<Menu />);
      wrapper.find(MenuItem).last().simulate("click");
      expect(mockDisconnect).toHaveBeenCalled();
      expect(mockTrack.stop).toHaveBeenCalled();
    });
  });

  describe("when there is not a profile", () => {
    it('should render the "More" icon', () => {
      mockUseAppState.mockImplementation(() => ({
        profile: null,
      }));
      const wrapper = shallow(<Menu />);
      expect(wrapper.exists(MoreIcon)).toBe(true);
    });

    it("should not display the profile name in the menu", () => {
      mockUseAppState.mockImplementation(() => ({
        profile: {name: undefined},
      }));
      const wrapper = shallow(<Menu />);
      expect(wrapper.find(MenuItem).find({disabled: true}).exists()).toBe(
        false,
      );
    });
  });
});
