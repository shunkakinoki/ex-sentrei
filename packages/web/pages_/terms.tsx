import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import TermsScreen from "@sentrei/ui/components/TermsScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Terms: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("terms");
  }, []);

  return (
    <>
      <SentreiHeader />
      <TermsScreen />
      <Footer />
    </>
  );
};

export default Terms;
