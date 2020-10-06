import {yupResolver} from "@hookform/resolvers";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";

import * as Yup from "yup";

import signin from "@sentrei/common/services/signin";
import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
import signup from "@sentrei/common/services/signup";
import {auth} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import AuthFormGoogleButton from "@sentrei/ui/components/AuthFormGoogleButton";
import AuthFormLoginGrid from "@sentrei/ui/components/AuthFormLoginGrid";
import AuthFormSignupGrid from "@sentrei/ui/components/AuthFormSignupGrid";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import AuthFormStyles from "./AuthFormStyles";

export interface Props {
  type: "login" | "reset" | "signup";
}

export default function AuthForm({type}: Props): JSX.Element {
  const classes = AuthFormStyles();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();
  const {t, lang} = useTranslation();
  const {query} = useRouter();

  const AuthFormSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("form:email.required"))
      .email(t("form:email.valid")),
    password: Yup.string().required(t("form:password.valid")),
  });

  const ResetFormSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("form:email.required"))
      .email(t("form:email.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    reValidateMode: "onChange",
    resolver:
      type === "reset"
        ? yupResolver(ResetFormSchema)
        : yupResolver(AuthFormSchema),
  });

  const google = (): void => {
    snackbar("info", t("snackbar:snackbar.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        trackEvent("Signed In", {provider: "google"});
        if (query.redirect) {
          Router.pushI18n(String(query.redirect));
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.loading"));

    switch (type) {
      case "reset":
        try {
          await auth.sendPasswordResetEmail(data.email).catch(err => {
            snackbar("error", err.message);
          });
          snackbar("success", t("form:email.check"));
          trackEvent("Send Reset Email");
        } catch (err) {
          snackbar("error", err.message);
        }
        backdrop("dismiss");
        break;
      case "login":
        try {
          signin(data.email, data.password, lang)
            .then(() => {
              backdrop("loading");
              trackEvent("Log In", {provider: "email"});
              if (query.redirect) {
                Router.pushI18n(String(query.redirect));
              }
            })
            .catch(err => {
              snackbar("error", err.message);
            });
        } catch (err) {
          snackbar("error", err.message);
        }
        backdrop("dismiss");
        break;
      case "signup":
        try {
          signup(data.email, data.password, lang)
            .then(() => {
              backdrop("loading");
              trackEvent("Signed Up", {provider: "email"});
              if (query.redirect) {
                Router.pushI18n(String(query.redirect));
              }
            })
            .catch(err => {
              snackbar("error", err.message);
            });
        } catch (err) {
          snackbar("error", err.message);
        }
        backdrop("dismiss");
        break;
      default:
    }
  };

  return (
    <Grid container spacing={3}>
      <Box p={1} />
      {type !== "reset" && (
        <AuthFormGoogleButton
          onClick={(): void => google()}
          title={
            type === "login" ? t("auth:login.google") : t("auth:signup.google")
          }
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        autoComplete="off"
        noValidate
      >
        <Controller
          as={
            <TextField
              autoComplete="email"
              autoFocus
              fullWidth
              id="email"
              label={t("common:common.email")}
              margin="normal"
              name="email"
              placeholder="example@sentrei.com"
              required
              variant="outlined"
              error={!!errors.email}
              inputRef={register}
              helperText={errors.email ? errors.email.message : ""}
            />
          }
          name="email"
          control={control}
          defaultValue=""
        />
        {type === "login" || type === "signup" ? (
          <Controller
            as={
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                label={t("common:common.password")}
                margin="normal"
                name="password"
                required
                type="password"
                variant="outlined"
                error={!!errors.password}
                inputRef={register}
                helperText={errors.password ? errors.password.message : ""}
              />
            }
            name="password"
            control={control}
            defaultValue=""
          />
        ) : null}
        {type === "login" || type === "signup" ? (
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("auth:auth.rememberMe")}
          />
        ) : null}
        <FormButtonSubmit>
          {type === "reset" && t("auth:resetPassword.button")}
          {type === "login" && t("auth:login.button")}
          {type === "signup" && t("auth:signup.button")}
        </FormButtonSubmit>
      </form>
      <Box p={1} />
      {type === "login" && <AuthFormLoginGrid />}
      {type === "signup" && <AuthFormSignupGrid />}
    </Grid>
  );
}
