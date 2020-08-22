import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/data.svg");

export default function DataPicture(): JSX.Element {
  return <PictureSvg alt="data" src={src} />;
}
