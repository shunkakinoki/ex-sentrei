import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/time.svg");

export default function TimePicture(): JSX.Element {
  return <PictureSvg alt="time" src={src} />;
}
