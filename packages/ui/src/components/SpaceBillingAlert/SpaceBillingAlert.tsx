import Alert from "@material-ui/lab/Alert";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export default function SpaceBillingAlert(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Alert variant="outlined" severity="info">
      {t("space:billing.alert")}
    </Alert>
  );
}
