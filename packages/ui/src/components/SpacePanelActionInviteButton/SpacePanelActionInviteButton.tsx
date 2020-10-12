import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import {FreeTier} from "@sentrei/common/const/tiers";
import {trackEvent} from "@sentrei/common/utils/segment";
import Space from "@sentrei/types/models/Space";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
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
    trackEvent("Open Billing Dialog Invite");
    setOpen(true);
  };

  const handleClose = (): void => {
    trackEvent("Close Billing Dialog Invite");
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
        <FormButtonSubmit startIcon={<PersonAddIcon />} onClick={handleOpen}>
          {t("common:common.invite")}
        </FormButtonSubmit>
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
