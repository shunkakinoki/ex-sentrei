import {NextPage} from "next";
import * as React from "react";

import TermsScreen from "@sentrei/ui/components/TermsScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Terms: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="terms" />
      <TermsScreen />
      <SentreiFooter />
    </>
  );
};

export default Terms;
