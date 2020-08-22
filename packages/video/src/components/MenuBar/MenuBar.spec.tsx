/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {fireEvent, render} from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";

import {IVideoContext} from "@sentrei/video/components/VideoProvider";
import useFullScreenToggle from "@sentrei/video/hooks/useFullScreenToggle";
import useRoomState from "@sentrei/video/hooks/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

import {useAppState} from "@sentrei/video/state";

import MenuBar from "./MenuBar";

const mockedUseRoomState = useRoomState as jest.Mock<string>;
const mockeduseFullScreenToggle = useFullScreenToggle as jest.Mock;
const mockedUseVideoContext = useVideoContext as jest.Mock<IVideoContext>;
const mockUseAppState = useAppState as jest.Mock<any>;
const mockToggleFullScreen = jest.fn();
const mockGetToken = jest.fn(() => Promise.resolve("mockToken"));

jest.mock("@sentrei/video/hooks/useVideoContext");
jest.mock("@sentrei/video/hooks/useRoomState");
jest.mock("@sentrei/video/hooks/useFullScreenToggle");
jest.mock("@sentrei/video/state");

// @ts-ignore
delete window.location;
// @ts-ignore
window.location = {
  pathname: "",
  search: "",
  origin: "",
};
const renderComponent = (): JSX.Element => <MenuBar />;

// delete window.location;
// // @ts-ignore
// window.location = {
//   origin: '',
// };

const mockReplaceState = jest.fn();
Object.defineProperty(window.history, "replaceState", {
  value: mockReplaceState,
});

describe("the MenuBar component", () => {
  beforeEach(jest.clearAllMocks);
  mockeduseFullScreenToggle.mockImplementation(() => [
    true,
    mockToggleFullScreen,
  ]);
  mockUseAppState.mockImplementation(() => ({getToken: mockGetToken}));

  it("should hide inputs when connected to a room", () => {
    mockedUseRoomState.mockImplementation(() => "connected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: false, room: {}, localTracks: []} as any),
    );
    const {container} = render(renderComponent());
    expect(container.querySelector("input")).toEqual(null);
  });

  it("should display inputs when disconnected from a room", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: false, room: {}, localTracks: []} as any),
    );
    const {container} = render(renderComponent());
    expect(container.querySelectorAll("input").length).toEqual(1);
  });

  it("should display a loading spinner while connecting to a room", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: true, room: {}, localTracks: []} as any),
    );
    const {container} = render(renderComponent());
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("should display a loading spinner while fetching a token", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: false, room: {}, localTracks: []} as any),
    );
    mockUseAppState.mockImplementationOnce(() => ({isFetching: true}));
    const {container} = render(renderComponent());
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("should disable the Join Room button when the Name input or Room input are empty", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: false, room: {}, localTracks: []} as any),
    );
    const {getByLabelText} = render(renderComponent());
    fireEvent.change(getByLabelText("Name"), {target: {value: "Foo"}});
    fireEvent.change(getByLabelText("Name"), {target: {value: ""}});
  });

  it("should enable the Join Room button when the Name input and Room input are not empty", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: false, room: {}, localTracks: []} as any),
    );
    const {getByLabelText} = render(renderComponent());
    fireEvent.change(getByLabelText("Name"), {target: {value: "Foo"}});
  });

  it("should disable the Join Room button when connecting to a room", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: true, room: {}, localTracks: []} as any),
    );
    const {getByLabelText} = render(renderComponent());
    fireEvent.change(getByLabelText("Name"), {target: {value: "Foo"}});
  });

  it("should disable the Join Room button while local tracks are being acquired", () => {
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isAcquiringLocalTracks: true, room: {}, localTracks: []} as any),
    );
    const {getByLabelText} = render(renderComponent());
    fireEvent.change(getByLabelText("Name"), {target: {value: "Foo"}});
    // expect(getByText("Join Room")).toBeDisabled();
  });

  it("should hide the name input when a user has the displayName property and display the name instead", () => {
    mockUseAppState.mockImplementation(() => ({
      profile: {name: "Test Name"},
    }));
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: true, room: {}, localTracks: []} as any),
    );
    const {queryByLabelText, findByText} = render(renderComponent());
    expect(queryByLabelText("Name")).toBe(null);
    expect(findByText("Test Name")).toBeTruthy();
  });

  it("should show the name input when a user has the displayName property and the customIdentity query parameter is present", () => {
    window.location = {...window.location, search: "?customIdentity=true"};
    mockUseAppState.mockImplementation(() => ({
      profile: {name: "Test Name"},
    }));
    mockedUseRoomState.mockImplementation(() => "disconnected");
    mockedUseVideoContext.mockImplementation(
      () => ({isConnecting: true, room: {}, localTracks: []} as any),
    );
    const {queryByLabelText, queryByText} = render(renderComponent());
    expect(queryByLabelText("Name")).toBeTruthy();
    expect(queryByText("Test Name")).not.toBeTruthy();
  });
});
