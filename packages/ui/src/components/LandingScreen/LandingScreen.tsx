import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingCta from "@sentrei/ui/components/LandingCta";
import LandingExplore from "@sentrei/ui/components/LandingExplore";
import LandingOutline from "@sentrei/ui/components/LandingOutline";
import LandingSectionBond from "@sentrei/ui/components/LandingSectionBond";
import LandingSectionFocus from "@sentrei/ui/components/LandingSectionFocus";
import LandingSectionWork from "@sentrei/ui/components/LandingSectionWork";

export default function LandingScreen(): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={3} />
      <LandingOutline />
      <Box p={3} />
      <LandingExplore />
      <Box p={3} />
      <LandingSectionBond />
      <Box p={3} />
      <LandingSectionFocus />
      <Box p={3} />
      <LandingSectionWork />
      <Box p={3} />
      <LandingCta />
      <Box p={3} />
    </>
  );
}
