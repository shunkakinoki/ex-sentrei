import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/video.svg");

export default function VideoPicture(): JSX.Element {
  return <PictureSvg alt="video" src={src} />;
}
