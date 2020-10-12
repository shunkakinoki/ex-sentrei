import Box from "@material-ui/core/Box";

import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import PitchBanner from "@sentrei/ui/components/PitchBanner";
import PitchSection from "@sentrei/ui/components/PitchSection";
import PitchSlideWidget from "@sentrei/ui/components/PitchSlideWidget";

export default function PricingScreen(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <PitchBanner />
      <Box p={1} />
      <PitchSlideWidget />
      <Box p={1} />
      <PitchSection
        title={t("pitch:section.two")}
        url="https://www.youtube.com/watch?v=hvVKiPQKEt0"
      />
      <Box p={1} />
      <PitchSection
        title={t("pitch:section.one")}
        url="https://www.youtube.com/watch?v=VH6_ooC-L7I"
      />
      <Box p={3} />
    </>
  );
}
