import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingFaq from "@sentrei/ui/components/LandingFaq";
import LandingOutline from "@sentrei/ui/components/LandingOutline";
import LandingPricing from "@sentrei/ui/components/LandingPricing";
import LandingTimelineDot from "@sentrei/ui/components/LandingTimelineDot";

export default function LandingScreen(): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={5} />
      <LandingOutline />
      <Box p={6} />
      <LandingTimelineDot />
      <Box p={3} />
      <LandingPricing />
      <Box p={3} />
      <LandingFaq />
      <Box p={3} />
    </>
  );
}
