import {storiesOf} from "@storybook/react";
import * as React from "react";

import ProTip from ".";

storiesOf("ProTip", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Just an ProTip story", () => <ProTip />);
