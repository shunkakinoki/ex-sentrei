import {NextPage} from "next";
import * as React from "react";

import PrivacyScreen from "@sentrei/ui/components/PrivacyScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Privacy: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="privacy" />
      <PrivacyScreen />
      <SentreiFooter />
    </>
  );
};

export default Privacy;
