import Button from "@material-ui/core/Button";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessCheckoutLink from "@sentrei/common/services/accessCheckoutLink";
import getStripe from "@sentrei/common/utils/getStripe";
import Member from "@sentrei/types/models/Member";
import MuiButton from "@sentrei/ui/components/MuiButton";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  role: Member.Role;
  spaceId: string;
}

export default function SpaceBillingPortalButton({
  role,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  React.useEffect(() => {
    if (role === "admin")
      accessCheckoutLink("pro", spaceId, window.location.href)
        .then(
          async (data): Promise<void> => {
            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId: data.id});
          },
        )
        .catch(err => {
          snackbar("error", err.message);
        });
  }, [role, spaceId, snackbar]);

  if (role !== "admin") {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.disabled")}
      </Button>
    );
  }

  return (
    <MuiButton color="primary" variant="contained">
      {t("common:common.billingLink")}
    </MuiButton>
  );
}
