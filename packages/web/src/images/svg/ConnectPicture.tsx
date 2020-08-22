import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/connect.svg");

export default function ConnectPicture(): JSX.Element {
  return <PictureSvg alt="connect" src={src} />;
}
