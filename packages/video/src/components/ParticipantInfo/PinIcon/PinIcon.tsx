import React from "react";
import {PinIcon} from "@primer/octicons-react";
import Tooltip from "@material-ui/core/Tooltip";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function CustomPinIcon() {
  return (
    <Tooltip title="Participant is pinned. Click to un-pin." placement="top">
      <SvgIcon style={{float: "right", fontSize: "29px"}}>
        <PinIcon />
      </SvgIcon>
    </Tooltip>
  );
}
