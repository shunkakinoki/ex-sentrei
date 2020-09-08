import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {FreeTier} from "@sentrei/common/const/tiers";
import Space from "@sentrei/types/models/Space";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
  space: Space.Get;
}

export default function SpacePanelActionInviteButton({
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

  if (space.tier === "free" && space.memberCount >= FreeTier.memberCount) {
    return (
      <>
        <BillingDialog
          open={open}
          message={t("billing:billing.free.memberLimit")}
          upgrade={t("billing:billing.free.upgrade")}
          namespaceId={namespaceId}
          handleClose={handleClose}
        />
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={handleOpen}
        >
          {t("common:common.invite")}
        </Button>
      </>
    );
  }

  return (
    <MuiButton
      href="/[namespaceId]/settings/invite"
      as={`/${namespaceId}/settings/invite`}
      fullWidth
      color="primary"
      variant="outlined"
      startIcon={<PersonAddIcon />}
    >
      {t("common:common.invite")}
    </MuiButton>
  );
}
