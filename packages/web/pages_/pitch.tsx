import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import PitchScreen from "@sentrei/ui/components/PitchScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pitch: NextPage = () => {
  return (
    <>
      <SentreiHeader />
      <PitchScreen />
      <Footer />
    </>
  );
};

export default Pitch;
