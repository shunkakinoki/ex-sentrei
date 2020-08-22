import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/goal.svg");

export default function GoalPicture(): JSX.Element {
  return <PictureSvg alt="goal" src={src} />;
}
