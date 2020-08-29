import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Footer from "@sentrei/ui/components/Footer";
import Loader from "@sentrei/ui/components/Loader";
import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Support: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("support");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (user) {
    Router.pushI18n(`/[spaceId/support`, `/${user.uid}/support`);
  }

  return (
    <>
      <SentreiHeader />
      <SupportScreen />
      <Footer />
    </>
  );
};

export default Support;
