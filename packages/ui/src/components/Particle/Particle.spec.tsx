import {shallow} from "enzyme";
import * as React from "react";

import Particle from ".";

describe("Particle", () => {
  test("render", () => {
    shallow(<Particle />);
  });
});
