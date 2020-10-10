import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingBond from "@sentrei/ui/components/LandingBond";
import LandingCta from "@sentrei/ui/components/LandingCta";
import LandingExplore from "@sentrei/ui/components/LandingExplore";
import LandingFocus from "@sentrei/ui/components/LandingFocus";
import LandingOutline from "@sentrei/ui/components/LandingOutline";
import LandingWork from "@sentrei/ui/components/LandingWork";

export default function LandingScreen(): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={3} />
      <LandingOutline />
      <Box p={3} />
      <LandingExplore />
      <Box p={3} />
      <LandingBond />
      <Box p={3} />
      <LandingFocus />
      <Box p={3} />
      <LandingWork />
      <Box p={3} />
      <LandingCta />
      <Box p={3} />
    </>
  );
}
