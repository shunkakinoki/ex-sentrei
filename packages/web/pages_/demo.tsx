import {NextPage} from "next";
import * as React from "react";

import DemoScreen from "@sentrei/ui/components/DemoScreen";
import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Demo: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="demo" />
      <DemoScreen />
      <Footer />
    </>
  );
};

export default Demo;
