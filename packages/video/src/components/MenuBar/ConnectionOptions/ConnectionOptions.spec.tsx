import {Select, TextField} from "@material-ui/core";
import {shallow} from "enzyme";
import React from "react";

import useRoomState from "@sentrei/video/hooks/useRoomState";

import {useAppState} from "@sentrei/video/state";
import {initialSettings} from "@sentrei/video/state/settings/settingsReducer";

import ConnectionOptions from "./ConnectionOptions";

jest.mock("@sentrei/video/hooks/useRoomState");
jest.mock("@sentrei/video/state");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseAppState = useAppState as jest.Mock<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseRoomState = useRoomState as jest.Mock<any>;

const mockDispatchSetting = jest.fn();
mockUseAppState.mockImplementation(() => ({
  settings: initialSettings,
  dispatchSetting: mockDispatchSetting,
}));

describe("the ConnectionOptions component", () => {
  afterEach(jest.clearAllMocks);

  describe("when not connected to a room", () => {
    mockUseRoomState.mockImplementation(() => "disconnected");
    it("should render correctly", () => {
      const wrapper = shallow(<ConnectionOptions />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should dispatch settings changes", () => {
      const wrapper = shallow(<ConnectionOptions />);
      wrapper
        .find(Select)
        .find({name: "dominantSpeakerPriority"})
        .simulate("change", {
          target: {value: "testValue", name: "dominantSpeakerPriority"},
        });
      expect(mockDispatchSetting).toHaveBeenCalledWith({
        value: "testValue",
        name: "dominantSpeakerPriority",
      });
    });

    it("should not dispatch settings changes from a number field when there are non-digits in the value", () => {
      const wrapper = shallow(<ConnectionOptions />);
      wrapper
        .find(TextField)
        .find({name: "maxTracks"})
        .simulate("change", {target: {value: "123456a", name: "maxTracks"}});
      expect(mockDispatchSetting).not.toHaveBeenCalled();
    });

    it("should dispatch settings changes from a number field when there are only digits in the value", () => {
      const wrapper = shallow(<ConnectionOptions />);
      wrapper
        .find(TextField)
        .find({name: "maxTracks"})
        .simulate("change", {target: {value: "123456", name: "maxTracks"}});
      expect(mockDispatchSetting).toHaveBeenCalledWith({
        value: "123456",
        name: "maxTracks",
      });
    });
  });

  describe("when connected to a room", () => {
    mockUseRoomState.mockImplementation(() => "connected");
    it("should render correctly", () => {
      const wrapper = shallow(<ConnectionOptions />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
