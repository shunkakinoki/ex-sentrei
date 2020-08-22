import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import CreditsScreen from "@sentrei/ui/components/CreditsScreen";
import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Credits: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("credits");
  }, []);

  return (
    <>
      <SentreiHeader />
      <CreditsScreen />
      <Footer metomic={false} />
    </>
  );
};

export default Credits;
