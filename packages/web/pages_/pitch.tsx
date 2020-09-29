import {NextPage} from "next";
import * as React from "react";

import PitchScreen from "@sentrei/ui/components/PitchScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pitch: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="pitch" />
      <PitchScreen />
      <SentreiFooter />
    </>
  );
};

export default Pitch;
