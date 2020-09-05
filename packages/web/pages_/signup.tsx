import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import AuthForm from "@sentrei/ui/components/AuthForm";
import Loader from "@sentrei/ui/components/Loader";
import OneTap from "@sentrei/ui/components/OneTap";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Signup: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  if (user === undefined) {
    return <Loader />;
  }

  if (user) {
    Router.pushI18n("/dashboard");
  }

  return (
    <>
      <SentreiHeader landingKey="signup" />
      <OneTap user={user} />
      <AuthForm type="signup" />;
    </>
  );
};

export default Signup;
