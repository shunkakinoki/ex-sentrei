import {storiesOf} from "@storybook/react";
import * as React from "react";

import FooterCopyright from ".";

storiesOf("FooterCopyright", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Just an FooterCopyright story", () => <FooterCopyright />);
