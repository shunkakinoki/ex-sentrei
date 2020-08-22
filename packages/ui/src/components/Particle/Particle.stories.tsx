import {storiesOf} from "@storybook/react";
import * as React from "react";

import Particle from ".";

storiesOf("Particle", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Just an Particle story", () => <Particle />);
