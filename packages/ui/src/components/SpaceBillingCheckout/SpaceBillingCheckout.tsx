import Button from "@material-ui/core/Button";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessCheckoutLink from "@sentrei/common/services/accessCheckoutLink";
import getStripe from "@sentrei/common/utils/getStripe";
import Member from "@sentrei/types/models/Member";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  role: Member.Role;
  spaceId: string;
}

export default function SpaceBillingCheckout({
  role,
  spaceId,
}: Props): JSX.Element {
  const {t, lang} = useTranslation();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();

  const handleClick = (): void => {
    snackbar("info", t("common:snackbar.loading"));
    backdrop("loading");
    if (role === "admin") {
      accessCheckoutLink(spaceId, lang, window.location.origin)
        .then(
          async (data): Promise<void> => {
            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId: data.id});
          },
        )
        .catch(err => {
          snackbar("error", err.message);
          backdrop("dismiss");
        });
    }
  };

  if (role !== "admin") {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.disabled")}
      </Button>
    );
  }

  return (
    <Button fullWidth color="primary" variant="contained" onClick={handleClick}>
      {t("space:billing.upgradeNow")}
    </Button>
  );
}
