import {shallow} from "enzyme";
import * as React from "react";

import ProTip from ".";

describe("ProTip", () => {
  test("render", () => {
    shallow(<ProTip />);
  });
});
