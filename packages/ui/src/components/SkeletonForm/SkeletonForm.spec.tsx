import {shallow} from "enzyme";
import * as React from "react";

import SkeletonForm from ".";

describe("SkeletonForm", () => {
  test("render", () => {
    shallow(<SkeletonForm logo={<></>} />);
  });
});
