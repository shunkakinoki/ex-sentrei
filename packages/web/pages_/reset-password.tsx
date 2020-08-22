import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";
import AuthForm from "@sentrei/ui/components/AuthForm";

import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const ResetPassword: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("reset-password");
  }, []);

  return (
    <>
      <SentreiHeader /> <AuthForm type="reset" />;
    </>
  );
};

export default ResetPassword;
