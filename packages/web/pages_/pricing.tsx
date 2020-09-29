import {NextPage} from "next";
import * as React from "react";

import PricingScreen from "@sentrei/ui/components/PricingScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pricing: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="pricing" />
      <PricingScreen />
      <SentreiFooter />
    </>
  );
};

export default Pricing;
