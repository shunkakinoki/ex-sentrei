import useTranslation from "next-locale/useTranslation";
import {NextSeo} from "next-seo";
import * as React from "react";

import {LandingKey} from "@sentrei/types/models/Landing";

export interface Props {
  landingKey: LandingKey;
}

export default function SeoLanding({landingKey}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <NextSeo
      noindex={false}
      nofollow={false}
      title={t(`seo:landing.${landingKey}`)}
      titleTemplate="%s"
    />
  );
}
