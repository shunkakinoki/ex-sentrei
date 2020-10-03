import * as React from "react";

import Img from "react-optimized-image";

import SrcImg from "@sentrei/public/images/banner-landing.png";

export default function LogoPicture(): JSX.Element {
  return <Img alt="logo" src={SrcImg} className="next-optimized-images" />;
}
