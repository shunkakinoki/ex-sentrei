/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";

import Svg from "react-optimized-image";

import SrcImg from "../../../public/images/connect.svg";

export default function ConnectPicture(): JSX.Element {
  return <Svg alt="logo" src={SrcImg} className="next-optimized-images" />;
}
