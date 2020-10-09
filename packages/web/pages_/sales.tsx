import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import SalesScreen from "@sentrei/ui/components/SalesScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Sales: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.pushI18n(`/[namespaceId/sales`, `/${user.uid}/sales`);
  }

  return (
    <>
      <SentreiHeader papercups={false} landingKey="sales" />
      <SalesScreen />
    </>
  );
};

export default Sales;
