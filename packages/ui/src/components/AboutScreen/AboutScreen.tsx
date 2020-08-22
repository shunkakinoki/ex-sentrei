import Box from "@material-ui/core/Box";

import * as React from "react";

import AboutInvestor from "@sentrei/ui/components/AboutInvestor";
import AboutMessage from "@sentrei/ui/components/AboutMessage";
import AboutMission from "@sentrei/ui/components/AboutMission";
import AboutTeam from "@sentrei/ui/components/AboutTeam";

export default function AboutScreen(): JSX.Element {
  return (
    <>
      <Box p={1} />
      <div id="mission">
        <AboutMission />
      </div>
      <Box p={3} />
      <div id="team">
        <AboutTeam />
      </div>
      <Box p={3} />
      <div id="investor">
        <AboutInvestor />
      </div>
      <Box p={3} />
      <AboutMessage />
      <Box p={3} />
    </>
  );
}
