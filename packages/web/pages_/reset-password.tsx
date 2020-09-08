import {NextPage} from "next";
import * as React from "react";

import AuthForm from "@sentrei/ui/components/AuthForm";

import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const ResetPassword: NextPage = () => {
  return (
    <>
      <SentreiHeader landingKey="reset-password" /> <AuthForm type="reset" />
    </>
  );
};

export default ResetPassword;
