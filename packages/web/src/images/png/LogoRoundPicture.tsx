/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import Img from "react-optimized-image";

import SrcImg from "../../../public/images/logo-round.png";

export default function LogoPicture(): JSX.Element {
  return <Img alt="logo" src={SrcImg} className="next-optimized-images" />;
}
