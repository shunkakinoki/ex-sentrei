import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {FreeTier, ProTier} from "@sentrei/common/const/tiers";
import {trackEvent} from "@sentrei/common/utils/segment";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
  room: Room.Get;
  space: Space.Get;
}

export default function RoomCardVisitButton({
  namespaceId,
  room,
  space,
}: Props): JSX.Element {
  const {t} = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      color: {
        color: room.color,
      },
    }),
  );
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    trackEvent("Open Billing Dialog Visit");
    setOpen(true);
  };

  const handleClose = (): void => {
    trackEvent("Close Billing Dialog Visit");
    setOpen(false);
  };

  if (
    (space.tier === "free" &&
      room.participantCount >= FreeTier.participantCount) ||
    (space.tier === "pro" && room.participantCount >= ProTier.participantCount)
  ) {
    return (
      <>
        <BillingDialog
          open={open}
          message={
            space.tier === "free"
              ? t("billing:billing.free.participantLimit")
              : t("billing:billing.pro.participantLimit")
          }
          upgrade={
            space.tier === "free"
              ? t("billing:billing.free.upgrade")
              : t("billing:billing.pro.upgrade")
          }
          namespaceId={namespaceId}
          handleClose={handleClose}
        />
        <FormButtonSubmit
          startIcon={<MeetingRoomIcon />}
          onClick={handleOpen}
          color="inherit"
          variant="text"
        >
          {t("common:common.visit")}
        </FormButtonSubmit>
      </>
    );
  }

  return (
    <MuiButton
      href="/[namespaceId]/[nameroomId]"
      as={`/${space.namespaceId}/${room.nameroomId}`}
      fullWidth
      variant="outlined"
      color="inherit"
      className={classes.color}
      startIcon={<MeetingRoomIcon />}
    >
      {t("common:common.visit")}
    </MuiButton>
  );
}
