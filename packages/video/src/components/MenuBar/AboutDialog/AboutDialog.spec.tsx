import {render} from "@testing-library/react";
import React from "react";

import {useAppState} from "@sentrei/video/state";

import AboutDialog from "./AboutDialog";

jest.mock("twilio-video", () => ({version: "1.2", isSupported: true}));
jest.mock("@sentrei/video/state");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseAppState = useAppState as jest.Mock<any>;
mockUseAppState.mockImplementation(() => ({roomType: undefined}));

describe("the AboutDialog component", () => {
  it("should display Video.isSupported", () => {
    const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
    expect(getByText("Browser supported: true")).toBeTruthy();
  });

  it("should display the SDK version", () => {
    const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
    expect(getByText("SDK Version: 1.2")).toBeTruthy();
  });

  it("should not display the room type when it is unknown", () => {
    const {queryByText} = render(<AboutDialog open onClose={(): void => {}} />);
    expect(queryByText("Room Type:")).not.toBeTruthy();
  });

  it("should display the room type", () => {
    mockUseAppState.mockImplementationOnce(() => ({roomType: "group-small"}));
    const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
    expect(getByText("Room Type: group-small")).toBeTruthy();
  });

  describe("when running locally", () => {
    beforeEach(() => {
      // @ts-ignore
      process.env = {};
    });

    it("should display N/A as the git tag", () => {
      const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
      expect(getByText("Deployed Tag: N/A")).toBeTruthy();
    });

    it("should disaply N/A as the commit hash", () => {
      const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
      expect(getByText("Deployed Commit Hash: N/A")).toBeTruthy();
    });
  });

  describe("when deployed via CircleCI", () => {
    beforeEach(() => {
      // @ts-ignore
      process.env = {
        REACT_APP_GIT_TAG: "v0.1",
        REACT_APP_GIT_COMMIT: "01b2c3",
      };
    });

    it("should display the git tag", () => {
      const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
      expect(getByText("Deployed Tag: v0.1")).toBeTruthy();
    });

    it("should display the commit hash", () => {
      const {getByText} = render(<AboutDialog open onClose={(): void => {}} />);
      expect(getByText("Deployed Commit Hash: 01b2c3")).toBeTruthy();
    });
  });
});
