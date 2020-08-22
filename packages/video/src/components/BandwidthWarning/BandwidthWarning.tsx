import {styled} from "@material-ui/core";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React from "react";

const BandwidthWarningContainer = styled("div")({
  position: "absolute",
  zIndex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Warning = styled("h3")({
  textAlign: "center",
  margin: "0.6em 0",
});

export default function BandwidthWarning(): JSX.Element {
  return (
    <BandwidthWarningContainer>
      <div>
        <ErrorOutlineIcon fontSize="large" />
      </div>
      <Warning>Insufficient Bandwidth</Warning>
    </BandwidthWarningContainer>
  );
}
