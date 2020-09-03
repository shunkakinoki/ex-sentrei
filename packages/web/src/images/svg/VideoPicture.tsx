/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";

import Svg from "react-optimized-image";

import SrcImg from "../../../public/images/video.svg";

export default function VideoPicture(): JSX.Element {
  return <Svg alt="logo" src={SrcImg} className="next-optimized-images" />;
}
