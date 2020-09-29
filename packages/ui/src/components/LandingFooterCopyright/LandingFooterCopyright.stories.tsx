import {storiesOf} from "@storybook/react";
import * as React from "react";

import LandingFooterCopyright from ".";

storiesOf("LandingFooterCopyright", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("LandingFooterCopyright", () => <LandingFooterCopyright />);
