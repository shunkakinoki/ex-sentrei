import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import {analytics} from "@sentrei/common/utils/firebase";
import AuthForm from "@sentrei/ui/components/AuthForm";
import Loader from "@sentrei/ui/components/Loader";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";
import SentreiOneTap from "@sentrei/web/components/SentreiOneTap";

const Signup: NextPage = () => {
  const {user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("signup");
  }, []);

  if (user) {
    Router.pushI18n("/dashboard");
  }

  if (user === undefined) {
    return <Loader />;
  }

  return (
    <>
      <SentreiHeader />
      <SentreiOneTap user={user} />
      <AuthForm type="signup" />;
    </>
  );
};

export default Signup;
