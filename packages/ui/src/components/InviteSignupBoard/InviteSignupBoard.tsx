/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";
import "firebase/auth";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
import signup from "@sentrei/common/services/signup";
import Invite from "@sentrei/types/models/Invite";

import MuiLink from "@sentrei/ui/components/MuiLink";

import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import InviteSignupBoardStyles from "./InviteSignupBoardStyles";

export interface Props {
  invite: Invite.Get;
  namespaceId: string;
  spaceId: string;
}

export default function InviteSignupBoard({
  invite,
  namespaceId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spaceId,
}: Props): JSX.Element {
  const classes = InviteSignupBoardStyles();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();
  const {t, lang} = useTranslation();
  const {query} = useRouter();

  const InviteSignupBoardSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("form:email.required"))
      .email(t("form.email.valid")),
    password: Yup.string().required(t("form.password.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(InviteSignupBoardSchema),
  });

  const google = (): void => {
    snackbar("info", t("snackbar:snackbar.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        if (query.redirect) {
          Router.pushI18n(String(query.redirect));
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.loading"));
    try {
      signup(data.email, data.password, lang)
        .then(() => {
          backdrop("loading");
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
  };

  return (
    <Container maxWidth="sm">
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Box p={3}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlinedIcon />
            </Avatar>
          </Box>
          <Typography component="h1" variant="h3" gutterBottom>
            {t("common:common.invite")}
          </Typography>
          {invite.email && (
            <Typography component="h1" variant="h3" gutterBottom>
              {invite.email}
            </Typography>
          )}
          <Typography align="center" variant="h6" component="h6">
            {t("common:common.inviteTo")} {namespaceId}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {t("common:common.inviteFrom")}
            {invite.createdBy.name}
          </Typography>
        </div>
      </Container>
      <Grid container spacing={3}>
        <Box p={1} />
        <Button
          onClick={(): void => google()}
          color="primary"
          variant="outlined"
          className={classes.button}
        >
          <img
            width="20px"
            alt="Google sign-in"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className={classes.google}
          />
          <Typography>{t("auth:signup.google")}</Typography>
        </Button>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("auth:auth.rememberMe")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t("auth:signup.button")}
          </Button>
        </form>
        <Grid container justify="center">
          <Grid item>
            <MuiLink href="/login" variant="body2">
              {t("auth:signup.alreadyHaveLogin")}
            </MuiLink>
          </Grid>
        </Grid>
        <Box p={1} />
        <Grid container justify="center">
          <Grid item>
            <MuiLink href="/terms" variant="body2">
              {t("auth:signup.byAgreeTerms")}
            </MuiLink>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
