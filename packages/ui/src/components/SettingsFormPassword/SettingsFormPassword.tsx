import {yupResolver} from "@hookform/resolvers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";

import * as Yup from "yup";

import updatePassword from "@sentrei/common/services/updatePassword";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

const SettingsFormPassword = (): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const PasswordFormSchema = Yup.object().shape({
    passwordNew: Yup.string().required(t("form:password.valid")),
    passwordOld: Yup.string().required(t("form.password.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(PasswordFormSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await updatePassword(data.passwordOld, data.passwordNew)?.then(() => {
        snackbar("success");
        backdrop("loading");
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
                id="passwordOld"
                label={t("common:common.passwordOld")}
                margin="normal"
                name="password"
                required
                variant="outlined"
                error={!!errors.passwordOld}
                inputRef={register}
                helperText={
                  errors.passwordOld ? errors.passwordOld.message : ""
                }
                type="text"
              />
            }
            name="password"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                fullWidth
                id="passwordNew"
                label={t("common:common.passwordNew")}
                margin="normal"
                name="password"
                required
                variant="outlined"
                error={!!errors.passwordConfirm}
                inputRef={register}
                helperText={
                  errors.passwordNew ? errors.passwordNew.message : ""
                }
                type="text"
              />
            }
            name="password"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit event="Update Password">
            {t("common:common.update")}
          </FormButtonSubmit>
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingsFormPassword;
