/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

import styled from "styled-components";

export interface Props {
  alt: string;
  height?: number;
  width?: number;
  src: any;
}

const StyledImg = styled.img`
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
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <StyledImg alt={alt} src={src} height={height} width={width} />
    </picture>
  );
}
