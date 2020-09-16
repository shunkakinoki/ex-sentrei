import Chip from "@material-ui/core/Chip";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import FlareIcon from "@material-ui/icons/Flare";
import WorkIcon from "@material-ui/icons/Work";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Room from "@sentrei/types/models/Room";

export interface Props {
  type: Room.Types;
}

export default function RoomTypeChip({type}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Chip
      color="primary"
      variant="outlined"
      icon={
        type === "bond" ? (
          <EventSeatIcon />
        ) : type === "focus" ? (
          <FlareIcon />
        ) : (
          <WorkIcon />
        )
      }
      label={
        type === "bond"
          ? t("common:common.bond")
          : type === "focus"
          ? t("common:common.focus")
          : t("common:common.work")
      }
    />
  );
}
