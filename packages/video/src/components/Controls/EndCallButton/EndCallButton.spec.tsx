import {shallow} from "enzyme";
import React from "react";

import EndCallButton from "./EndCallButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRoom: any = {disconnect: jest.fn()};
jest.mock("@sentrei/video/hooks/useVideoContext", () => (): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  room: any;
} => ({
  room: mockRoom,
}));

describe("End Call button", () => {
  it("should disconnect from the room when clicked", () => {
    const wrapper = shallow(<EndCallButton />);
    wrapper.simulate("click");
    expect(mockRoom.disconnect).toHaveBeenCalled();
  });
});
