import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import {Pin} from "@primer/octicons-react";
import React from "react";

export default function PinIcon(): JSX.Element {
  return (
    <Tooltip title="Participant is pinned. Click to un-pin." placement="top">
      <SvgIcon style={{float: "right", fontSize: "29px"}}>
        <Pin />
      </SvgIcon>
    </Tooltip>
  );
}
