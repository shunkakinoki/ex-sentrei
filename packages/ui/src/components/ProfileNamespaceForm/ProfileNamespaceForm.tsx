/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const ProfileNamespaceForm = ({profile}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const ProfileNamespaceFormSchema = Yup.object().shape({
    namespace: Yup.string()
      .required(t("form:namespace.namespaceRequired"))
      .matches(
        /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
        t("form:namespace.namespaceInvalid"),
      )
      .test("id", t("form:namespace.namespaceInvalid"), value => {
        const result = isReservedNamespace(value || "");
        return !result;
      })
      .test("id", t("form:namespace.namespaceAlreadyUsed"), async value => {
        const result = await validateNamespace(value || "");
        return result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(ProfileNamespaceFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.editing"));
    try {
      await createNamespace(data.namespace, profile.uid)?.then(() => {
        snackbar("success");
        backdrop("loading");
        setTimeout(() => {
          Router.pushI18n("/dashboard");
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
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                id="namespace"
                label={t("common:common.namespace")}
                margin="normal"
                name="namespace"
                required
                variant="outlined"
                error={!!errors.namespace}
                inputRef={register}
                helperText={errors.namespace ? errors.namespace.message : ""}
                type="text"
              />
            }
            name="namespace"
            control={control}
            defaultValue={profile.namespaceId}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("common:common.edit")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="reset"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={(): void => Router.back()}
          >
            {t("common:common.cancel")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileNamespaceForm;
