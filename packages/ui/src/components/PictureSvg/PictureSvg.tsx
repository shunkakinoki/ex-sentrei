/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

import styled from "styled-components";

export interface Props {
  alt: string;
  src: any;
}

const StyledImg = styled.img`
  max-width: 100%;
  pointer-events: none;
  user-select: none;
`;

export default function PictureSvg({alt, src}: Props): JSX.Element {
  return (
    <picture>
      <StyledImg alt={alt} src={src} />
    </picture>
  );
}
