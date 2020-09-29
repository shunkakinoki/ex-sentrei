import {shallow} from "enzyme";
import * as React from "react";

import LandingFooterCopyright from ".";

describe("LandingFooterCopyright", () => {
  test("render", () => {
    shallow(<LandingFooterCopyright />);
  });
});
