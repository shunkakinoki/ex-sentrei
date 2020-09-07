import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {FreeTier, ProTier} from "@sentrei/common/const/tiers";
import Space from "@sentrei/types/models/Space";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
  space: Space.Get;
}

export default function SpacePanelActionCreateButton({
  namespaceId,
  space,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (
    (space.tier === "free" && space.roomCount > FreeTier.roomCount) ||
    (space.tier === "pro" && space.roomCount > ProTier.roomCount)
  ) {
    return (
      <>
        <BillingDialog
          open={open}
          message={
            space.tier === "free"
              ? t("billing:billing.free.roomLimit")
              : t("billing:billing.pro.roomLimit")
          }
          upgrade={
            space.tier === "free"
              ? t("billing:billing.free.upgrade")
              : t("billing:billing.pro.upgrade")
          }
          namespaceId={namespaceId}
          handleClose={handleClose}
        />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<CreateIcon />}
          onClick={handleOpen}
        >
          {t("common:common.createRoom")}
        </Button>
      </>
    );
  }

  return (
    <MuiButton
      href="/[namespaceId]/rooms/create"
      as={`/${namespaceId}/rooms/create`}
      fullWidth
      color="primary"
      variant="contained"
      startIcon={<CreateIcon />}
    >
      {t("common:common.createRoom")}
    </MuiButton>
  );
}
