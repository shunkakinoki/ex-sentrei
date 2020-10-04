import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingHeaderButton from "@sentrei/ui/components/LandingHeaderButton";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";

import LandingHeaderMenuCompanyStyles from "./LandingHeaderMenuCompanyStyles";

export default function LandingHeaderMenuCompany(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = LandingHeaderMenuCompanyStyles();
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.company")}>
      <LandingHeaderButton
        href="/pricing"
        title={t("header:default.pricing")}
      />
    </LandingHeaderMenu>
  );
}
