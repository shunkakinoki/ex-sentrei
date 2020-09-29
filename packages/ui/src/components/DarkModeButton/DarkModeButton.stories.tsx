import {storiesOf} from "@storybook/react";
import * as React from "react";

import DarkModeButton from ".";

storiesOf("DarkModeButton", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("DarkModeButton", () => <DarkModeButton />);
