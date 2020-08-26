/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import PicturePng from "@sentrei/ui/components/PicturePng";

const src = require("../../../public/images/logo-round.png");

export default function LogoPicture(): JSX.Element {
  return <PicturePng alt="logo" src={src} />;
}
