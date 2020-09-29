import {NextPage} from "next";
import * as React from "react";

import CreditsScreen from "@sentrei/ui/components/CreditsScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Credits: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="credits" />
      <CreditsScreen />
      <SentreiFooter />
    </>
  );
};

export default Credits;
