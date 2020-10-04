import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingHeaderButton from "@sentrei/ui/components/LandingHeaderButton";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";

import LandingHeaderMenuResourcesStyles from "./LandingHeaderMenuResourcesStyles";

export default function LandingHeaderMenuResources(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = LandingHeaderMenuResourcesStyles();
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.resources")}>
      <LandingHeaderButton
        href="/pricing"
        title={t("header:default.pricing")}
      />
    </LandingHeaderMenu>
  );
}
