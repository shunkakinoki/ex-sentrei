import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {LandingKey} from "@sentrei/types/models/Landing";

export interface Props {
  landingKey: LandingKey;
}

export default function SeoLanding({landingKey}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <NextSeo
      nofollow
      noindex
      title={t(`seo:landing.${landingKey}`)}
      titleTemplate="Sentrei: %s"
    />
  );
}
