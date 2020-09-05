import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import TermsScreen from "@sentrei/ui/components/TermsScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Terms: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="terms" />
      <TermsScreen />
      <Footer />
    </>
  );
};

export default Terms;
