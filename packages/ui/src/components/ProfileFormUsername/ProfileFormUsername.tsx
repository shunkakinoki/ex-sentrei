import {yupResolver} from "@hookform/resolvers/yup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {
  createNamespace,
  isReservedNamespace,
  validateNamespace,
} from "@sentrei/common/firebase/namespaces";
import {trackEvent} from "@sentrei/common/utils/segment";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const ProfileFormUsername = ({profile}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const ProfileFormUsernameSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("form:username.usernameRequired"))
      .matches(
        /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
        t("form:username.usernameInvalid"),
      )
      .test("username", t("form:username.usernameInvalid"), value => {
        const result = isReservedNamespace(value || "");
        return !result;
      })
      .test("username", t("form:username.usernameAlreadyUsed"), async value => {
        const result = await validateNamespace(value || "");
        return result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(ProfileFormUsernameSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await createNamespace(data.username, profile.uid, "user")?.then(() => {
        snackbar("success");
        trackEvent("Edit Profile Username");
        backdrop("loading");
        setTimeout(() => {
          Router.replaceI18n("/dashboard");
        }, 300);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6} sm={5} md={4}>
              <Typography
                variant="h5"
                color="textSecondary"
                display="inline"
                gutterBottom
              >
                sentrei.com/
              </Typography>
            </Grid>
            <Grid item xs={6} sm={7} md={8}>
              <Controller
                as={
                  <TextField
                    autoFocus
                    fullWidth
                    id="username"
                    label={t("common:common.username")}
                    margin="normal"
                    name="username"
                    required
                    variant="outlined"
                    error={!!errors.username}
                    inputRef={register}
                    helperText={errors.username ? errors.username.message : ""}
                    type="text"
                  />
                }
                name="username"
                control={control}
                defaultValue={profile.namespaceId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit>{t("common:common.edit")}</FormButtonSubmit>
        </Grid>
        <Grid item xs={12}>
          <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileFormUsername;
