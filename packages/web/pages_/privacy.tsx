import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import PrivacyScreen from "@sentrei/ui/components/PrivacyScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Privacy: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("privacy");
  }, []);

  return (
    <>
      <SentreiHeader />
      <PrivacyScreen />
      <Footer />
    </>
  );
};

export default Privacy;
