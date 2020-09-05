import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import Loader from "@sentrei/ui/components/Loader";
import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Support: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user === undefined) {
    return <Loader />;
  }

  if (user) {
    Router.pushI18n(`/[namespaceId/support`, `/${user.uid}/support`);
  }

  return (
    <>
      <SentreiHeader papercups={false} />
      <SupportScreen />
    </>
  );
};

export default Support;
