import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import PricingScreen from "@sentrei/ui/components/PricingScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Pricing: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="pricing" />
      <PricingScreen />
      <Footer />
    </>
  );
};

export default Pricing;
