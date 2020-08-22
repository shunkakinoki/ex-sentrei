import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import AboutScreen from "@sentrei/ui/components/AboutScreen";
import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const About: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("about");
  }, []);

  return (
    <>
      <SentreiHeader type="about" />
      <AboutScreen />
      <Footer metomic={false} />
    </>
  );
};

export default About;
