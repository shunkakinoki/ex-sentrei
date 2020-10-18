import List from "@material-ui/core/List";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MovieIcon from "@material-ui/icons/Movie";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";
import LandingHeaderMenuItem from "@sentrei/ui/components/LandingHeaderMenuItem";

export default function LandingHeaderMenuProduct(): JSX.Element {
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.product")} type="product">
      <List dense>
        <LandingHeaderMenuItem
          href="/demo"
          icon={<MovieIcon />}
          title={t("header:product.demo.title")}
          description={t("header:product.demo.description")}
        />
        <LandingHeaderMenuItem
          href="/pitch"
          icon={<SlideshowIcon />}
          title={t("header:product.pitch.title")}
          description={t("header:product.pitch.description")}
        />
        <LandingHeaderMenuItem
          href="/pricing"
          icon={<LocalOfferIcon />}
          title={t("header:product.pricing.title")}
          description={t("header:product.pricing.description")}
        />
        <LandingHeaderMenuItem
          href="/support"
          icon={<AccessibilityIcon />}
          title={t("header:product.support.title")}
          description={t("header:product.support.description")}
        />
      </List>
    </LandingHeaderMenu>
  );
}
