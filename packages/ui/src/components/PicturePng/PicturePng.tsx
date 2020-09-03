/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

import Img from "react-optimized-image";
import styled from "styled-components";

export interface Props {
  alt: string;
  height?: number;
  width?: number;
  src: any;
}

const StyledImg = styled(Img)`
  max-width: 100%;
  pointer-events: none;
  user-select: none;
`;

export default function PicturePng({
  alt,
  src,
  height,
  width,
}: Props): JSX.Element {
  return <StyledImg src={src} webp />;
}
