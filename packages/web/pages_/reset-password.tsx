import {NextPage} from "next";
import * as React from "react";

import AuthScreen from "@sentrei/ui/components/AuthScreen";

import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const ResetPassword: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="reset-password" /> <AuthScreen type="reset" />
    </>
  );
};

export default ResetPassword;
