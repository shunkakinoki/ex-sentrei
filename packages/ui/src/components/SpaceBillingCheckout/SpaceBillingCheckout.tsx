import useTranslation from "next-locale/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";

import Stripe from "stripe";

import accessCheckoutLink from "@sentrei/common/services/accessCheckoutLink";
import getStripe from "@sentrei/common/utils/getStripe";
import {trackEvent} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import FormButtonDisabled from "@sentrei/ui/components/FormButtonDisabled";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
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
  const {t} = useTranslation();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();
  const router = useRouter();
  const {locale} = router;

  const [session, setSession] = React.useState<Stripe.Checkout.Session>();

  React.useEffect(() => {
    if (role === "admin")
      accessCheckoutLink(spaceId, locale ?? "en", window.location.href)
        .then((data): void => {
          setSession(data);
        })
        .catch(err => {
          snackbar("error", err.message);
        });
  }, [role, spaceId, locale, snackbar]);

  const handleClick = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.loading"));
    backdrop("loading");
    try {
      const stripe = await getStripe();
      if (session) {
        trackEvent("Visit Stripe Checkout");
        stripe?.redirectToCheckout({sessionId: session.id});
      }
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  if (role !== "admin") {
    return (
      <FormButtonDisabled>{t("common:common.disabled")}</FormButtonDisabled>
    );
  }

  if (!session) {
    return (
      <FormButtonDisabled>{t("common:common.loading")}</FormButtonDisabled>
    );
  }

  return (
    <FormButtonSubmit onClick={handleClick}>
      {t("space:billing.upgradeNow")}
    </FormButtonSubmit>
  );
}
