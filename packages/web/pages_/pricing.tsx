import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import PricingScreen from "@sentrei/ui/components/PricingScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pricing: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("pricing");
  }, []);

  return (
    <>
      <SentreiHeader />
      <PricingScreen />
      <Footer metomic={false} />
    </>
  );
};

export default Pricing;
