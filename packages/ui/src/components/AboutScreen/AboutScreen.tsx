import Box from "@material-ui/core/Box";

import * as React from "react";

import AboutCore from "@sentrei/ui/components/AboutCore";
import AboutInvestor from "@sentrei/ui/components/AboutInvestor";
import AboutMessage from "@sentrei/ui/components/AboutMessage";
import AboutMission from "@sentrei/ui/components/AboutMission";
import AboutTeam from "@sentrei/ui/components/AboutTeam";

export default function AboutScreen(): JSX.Element {
  return (
    <>
      <Box p={1} />
      <AboutMission />
      <Box p={5} />
      <AboutCore />
      <Box p={3} />
      <AboutTeam />
      <Box p={3} />
      <AboutInvestor />
      <Box p={3} />
      <AboutMessage />
      <Box p={3} />
    </>
  );
}
