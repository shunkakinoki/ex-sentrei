import Tooltip from "@material-ui/core/Tooltip";
import {shallow} from "enzyme";
import React from "react";

import useParticipantIsReconnecting from "@sentrei/video/hooks/useParticipantIsReconnecting";

import ParticipantConnectionIndicator from "./ParticipantConnectionIndicator";

jest.mock("@sentrei/video/hooks/useParticipantIsReconnecting");

const mockUseParticipantIsReconnecting = useParticipantIsReconnecting as jest.Mock<
  boolean
>;

describe("the ParticipantConnectionIndicator component", () => {
  describe("when the participant is reconnecting", () => {
    beforeEach(() =>
      mockUseParticipantIsReconnecting.mockImplementation(() => true),
    );

    it("should render the correct toolip", () => {
      const wrapper = shallow(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ParticipantConnectionIndicator participant={{} as any} />,
      );
      expect(wrapper.find(Tooltip).prop("title")).toBe(
        "Participant is reconnecting",
      );
    });

    it("should have isReconnecting css class", () => {
      const wrapper = shallow(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ParticipantConnectionIndicator participant={{} as any} />,
      );
      expect(wrapper.find("span").prop("className")).toContain(
        "makeStyles-isReconnecting-2",
      );
    });
  });

  describe("when the participant is not reconnecting", () => {
    beforeEach(() =>
      mockUseParticipantIsReconnecting.mockImplementation(() => false),
    );

    it("should render the correct tooltip", () => {
      const wrapper = shallow(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ParticipantConnectionIndicator participant={{} as any} />,
      );
      expect(wrapper.find(Tooltip).prop("title")).toBe(
        "Participant is connected",
      );
    });

    it("should not have isReconnecting css class", () => {
      const wrapper = shallow(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ParticipantConnectionIndicator participant={{} as any} />,
      );
      expect(wrapper.find("span").prop("className")).not.toContain(
        "makeStyles-isReconnecting-2",
      );
    });
  });
});
