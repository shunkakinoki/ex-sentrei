/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";

import Svg from "react-optimized-image";

import SrcImg from "../../../public/images/goal.svg";

export default function GoalPicture(): JSX.Element {
  return <Svg alt="logo" src={SrcImg} style={{maxWidth: "100%"}} />;
}
