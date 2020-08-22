import {render} from "@testing-library/react";
import React from "react";

import {IVideoContext} from "@sentrei/video/components/VideoProvider";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import LocalVideoPreview from "./LocalVideoPreview";

jest.mock("@sentrei/video/hooks/useVideoContext");

const mockedVideoContext = useVideoContext as jest.Mock<IVideoContext>;

describe("the LocalVideoPreview component", () => {
  it('it should render a VideoTrack component when there is a "camera" track', () => {
    mockedVideoContext.mockImplementation(() => {
      return {
        localTracks: [
          {
            name: "camera-123456",
            attach: jest.fn(),
            detach: jest.fn(),
            mediaStreamTrack: {getSettings: (): {} => ({})},
          },
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
    const {container} = render(<LocalVideoPreview />);
    expect(container.firstChild).toEqual(expect.any(window.HTMLVideoElement));
  });

  it('should render null when there are no "camera" tracks', () => {
    mockedVideoContext.mockImplementation(() => {
      return {
        localTracks: [
          {name: "microphone", attach: jest.fn(), detach: jest.fn()},
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
    const {container} = render(<LocalVideoPreview />);
    expect(container.firstChild).toEqual(null);
  });
});
