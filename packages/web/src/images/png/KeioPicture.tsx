/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import PicturePng from "@sentrei/ui/components/PicturePng";

const src = require("../../../public/images/keio.png");

export default function KeioPicture(): JSX.Element {
  return <PicturePng alt="keio" src={src} height={100} width={250} />;
}
