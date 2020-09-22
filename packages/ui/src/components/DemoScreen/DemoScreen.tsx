import Box from "@material-ui/core/Box";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import PitchBanner from "@sentrei/ui/components/PitchBanner";
import PitchSection from "@sentrei/ui/components/PitchSection";

export default function DemoScreen(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <PitchBanner />
      <Box p={1} />
      <PitchSection
        title={t("pitch:section.one")}
        url="https://www.youtube.com/watch?v=VH6_ooC-L7I"
      />
      <Box p={3} />
    </>
  );
}
