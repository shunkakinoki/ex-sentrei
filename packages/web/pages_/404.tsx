import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import HomeScreen from "@sentrei/ui/components/HomeScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const FourOFourPage: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="404" />
      <HomeScreen />
      <Footer />
    </>
  );
};

export default FourOFourPage;
