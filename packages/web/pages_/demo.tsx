import {NextPage} from "next";
import * as React from "react";

import DemoScreen from "@sentrei/ui/components/DemoScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Demo: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="demo" />
      <DemoScreen />
      <SentreiFooter />
    </>
  );
};

export default Demo;
