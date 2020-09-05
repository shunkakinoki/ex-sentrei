import {NextPage} from "next";
import * as React from "react";

import AboutScreen from "@sentrei/ui/components/AboutScreen";
import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const About: NextPage = () => {
  return (
    <>
      <SentreiHeader type="about" landingKey="about" />
      <AboutScreen />
      <Footer />
    </>
  );
};

export default About;
