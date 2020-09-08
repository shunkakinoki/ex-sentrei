import Container from "@material-ui/core/Container";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import AuthForm from "@sentrei/ui/components/AuthForm";
import FormSection from "@sentrei/ui/components/FormSection";

export interface Props {
  type: "login" | "reset" | "signup";
}

export default function AuthScreen({type}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={
          type === "reset" ? (
            <MailOutlinedIcon />
          ) : type === "login" ? (
            <LockOutlinedIcon />
          ) : type === "signup" ? (
            <AccountCircleOutlinedIcon />
          ) : (
            <></>
          )
        }
        title={
          type === "reset"
            ? t("auth:resetPassword.title")
            : type === "login"
            ? t("auth:login.title")
            : type === "signup"
            ? t("auth:signup.title")
            : ""
        }
        size="sm"
      />
      <Container maxWidth="sm">
        <AuthForm type={type} />
      </Container>
    </>
  );
}
