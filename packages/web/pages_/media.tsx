import {NextPage} from "next";
import * as React from "react";

import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Media: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="media" />
      <Footer />
    </>
  );
};

export default Media;
