import Button from "@material-ui/core/Button";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import accessCheckoutLink from "@sentrei/common/services/accessCheckoutLink";
import getStripe from "@sentrei/common/utils/getStripe";
import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  role: Member.Role;
  space: Space.Get;
  spaceId: string;
}

export default function SpaceBillingCheckout({
  role,
  space,
  spaceId,
}: Props): JSX.Element {
  const {t, lang} = useTranslation();
  const {snackbar} = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
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
    <Button disabled color="primary" variant="contained" onClick={handleClick}>
      {t("common:common.billingLink")}
    </Button>
  );
}
