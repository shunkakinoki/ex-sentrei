import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import PrivacyScreen from "@sentrei/ui/components/PrivacyScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Privacy: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="privacy" />
      <PrivacyScreen />
      <Footer />
    </>
  );
};

export default Privacy;
