import {Avatar} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import {shallow} from "enzyme";
import React from "react";

import UserAvatar, {getInitials} from "./UserAvatar";

describe("the UserAvatar component", () => {
  it("should display the users initials when there is a displayName property", () => {
    const wrapper = shallow(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <UserAvatar profile={{name: "Test User"} as any} />,
    );
    expect(wrapper.find(Avatar).text()).toBe("TU");
  });

  it("should display the Person icon when there is no displayName or photoURL properties", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrapper = shallow(<UserAvatar profile={{} as any} />);
    expect(wrapper.find(Person).exists()).toBe(true);
  });

  it("should display the users photo when the photoURL property exists", () => {
    const wrapper = shallow(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <UserAvatar profile={{photo: "testURL"} as any} />,
    );
    expect(wrapper.find(Avatar).find({src: "testURL"}).exists()).toBe(true);
  });

  describe("getInitials function", () => {
    it("should generate initials from a name", () => {
      expect(getInitials("test")).toBe("T");
      expect(getInitials("Test User")).toBe("TU");
      expect(getInitials("test User TWO")).toBe("TUT");
    });
  });
});
