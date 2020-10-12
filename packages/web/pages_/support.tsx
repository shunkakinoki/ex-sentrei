import {NextPage} from "next";
import Router from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Support: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.push(`/[namespaceId/support`, `/${user.uid}/support`);
  }

  return (
    <>
      <SentreiHeader papercups={false} landingKey="support" />
      <SupportScreen />
      <SentreiFooter />
    </>
  );
};

export default Support;
