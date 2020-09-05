import {NextPage} from "next";
import * as React from "react";

import CreditsScreen from "@sentrei/ui/components/CreditsScreen";
import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Credits: NextPage = () => {
  return (
    <>
      <SentreiHeader />
      <CreditsScreen />
      <Footer />
    </>
  );
};

export default Credits;
