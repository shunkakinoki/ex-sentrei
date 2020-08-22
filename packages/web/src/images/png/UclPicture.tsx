/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import PicturePng from "@sentrei/ui/components/PicturePng";

const src = require("../../../public/images/ucl.png");

export default function UclPicture(): JSX.Element {
  return <PicturePng alt="ucl" src={src} height={100} width={250} />;
}
