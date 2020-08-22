import {Select, Typography} from "@material-ui/core";
import {shallow} from "enzyme";
import React from "react";

import {useVideoInputDevices} from "@sentrei/video/components/MenuBar/DeviceSelector/deviceHooks";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import VideoInputList from "./VideoInputList";

jest.mock("@sentrei/video/hooks/useVideoContext");
jest.mock("@sentrei/video/components/MenuBar/DeviceSelector/deviceHooks");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseVideoContext = useVideoContext as jest.Mock<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseVideoInputDevices = useVideoInputDevices as jest.Mock<any>;
const mockGetLocalVideotrack = jest.fn(() => Promise.resolve);

const mockDevice = {
  deviceId: "123",
  label: "mock device",
};

const mockLocalTrack = {
  kind: "video",
  mediaStreamTrack: {
    label: "mock local video track",
    getSettings: (): {
      deviceId: string;
    } => ({deviceId: "234"}),
  },
};

mockUseVideoContext.mockImplementation(() => ({
  room: {},
  getLocalVideoTrack: mockGetLocalVideotrack,
  localTracks: [mockLocalTrack],
}));

describe("the VideoInputList component", () => {
  describe("with only one video input device", () => {
    it("should not display a Select menu and instead display the name of the local video track", () => {
      mockUseVideoInputDevices.mockImplementation(() => [mockDevice]);
      const wrapper = shallow(<VideoInputList />);
      expect(wrapper.find(Select).exists()).toBe(false);
      expect(wrapper.find(Typography).at(1).text()).toBe(
        "mock local video track",
      );
    });

    it('should display "No Local Video" when there is no local video track', () => {
      mockUseVideoInputDevices.mockImplementation(() => [mockDevice]);
      mockUseVideoContext.mockImplementationOnce(() => ({
        room: {},
        getLocalVideoTrack: mockGetLocalVideotrack,
        localTracks: [],
      }));
      const wrapper = shallow(<VideoInputList />);
      expect(wrapper.find(Typography).at(1).text()).toBe("No Local Video");
    });
  });

  it("should render a Select menu when there are multiple video input devices", () => {
    mockUseVideoInputDevices.mockImplementation(() => [mockDevice, mockDevice]);
    const wrapper = shallow(<VideoInputList />);
    expect(wrapper.find(Select).exists()).toBe(true);
    expect(wrapper.find(Typography).at(1).exists()).toBe(false);
  });
});
