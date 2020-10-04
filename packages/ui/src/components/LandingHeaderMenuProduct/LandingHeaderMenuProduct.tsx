import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingHeaderButton from "@sentrei/ui/components/LandingHeaderButton";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";

import LandingHeaderMenuProductStyles from "./LandingHeaderMenuProductStyles";

export default function LandingHeaderMenuProduct(): JSX.Element {
  const classes = LandingHeaderMenuProductStyles();
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.product")}>
      <LandingHeaderButton
        href="/pricing"
        title={t("header:default.pricing")}
      />
    </LandingHeaderMenu>
  );
}
