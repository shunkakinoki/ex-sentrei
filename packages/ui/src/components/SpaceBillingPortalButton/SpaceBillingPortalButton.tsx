import Button from "@material-ui/core/Button";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  href: undefined | string;
}

export default function SpaceBillingPortalButton({href}: Props): JSX.Element {
  const {t} = useTranslation();

  if (!href) {
    return (
      <Button disabled color="inherit" variant="outlined">
        {t("common:common.disabled")}
      </Button>
    );
  }

  return (
    <MuiButton href={href} color="primary" variant="contained">
      {t("common:common.billingLink")}
    </MuiButton>
  );
}
