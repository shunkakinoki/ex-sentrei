import {NextPage} from "next";
import * as React from "react";

import AboutScreen from "@sentrei/ui/components/AboutScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const About: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="about" />
      <AboutScreen />
      <SentreiFooter />
    </>
  );
};

export default About;
