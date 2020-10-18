import {NextPage} from "next";
import Router from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import SalesScreen from "@sentrei/ui/components/SalesScreen";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Sales: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.push(`/[namespaceId/sales`, `/${user.uid}/sales`);
  }

  return (
    <>
      <SentreiHeader papercups={false} landingKey="sales" />
      <SalesScreen />
      <SentreiFooter />
    </>
  );
};

export default Sales;
