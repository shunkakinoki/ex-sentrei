import * as React from "react";

import Svg from "react-optimized-image";

import SrcImg from "@sentrei/public/images/focus.svg";

export default function FocusPicture(): JSX.Element {
  return <Svg alt="logo" src={SrcImg} className="next-optimized-images" />;
}
