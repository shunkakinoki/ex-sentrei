import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import AuthForm from "@sentrei/ui/components/AuthForm";
import OneTap from "@sentrei/ui/components/OneTap";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Login: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    Router.pushI18n("/dashboard");
  }

  return (
    <>
      <SentreiHeader landingKey="login" />
      <OneTap user={user} />
      <AuthForm type="login" />
    </>
  );
};

export default Login;
