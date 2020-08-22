import {shallow} from "enzyme";
import * as React from "react";

import FooterCopyright from ".";

describe("FooterCopyright", () => {
  test("render", () => {
    shallow(<FooterCopyright />);
  });
});
