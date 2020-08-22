import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import PitchScreen from "@sentrei/ui/components/PitchScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pitch: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("pitch");
  }, []);

  return (
    <>
      <SentreiHeader />
      <PitchScreen />
      <Footer metomic={false} />
    </>
  );
};

export default Pitch;
